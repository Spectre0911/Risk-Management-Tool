import { createRequire } from "module";
import { fileURLToPath } from "url";

import bcrypt from "bcryptjs";
import path from "path";
// import { reverse } from "dns";
// import { user } from "pg/lib/defaults.js";

const require = createRequire(import.meta.url);
var request = require('request-promise'); // to connect to the ML server
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db.cjs");
const topoSort = require("toposort"); // you will need to install this package


//middleware
app.use(cors());
app.use(express.json()); //req.body

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//ROUTES//

//create a todo

//Contains the

async function testConnect() {
  console.log("Before connect");
  const client = await pool.connect();
  console.log("Connected!");
  client.release();
}

testConnect();

// Create a project

// Get all notifcations
app.post("/api/createProject", async (req, postRes) => {
  try {
    console.log(req.body);
    await pool.query(
      "INSERT INTO projects (projectname, closed, opened, deadline, brief, budget) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        req.body.projectName,
        req.body.closed,
        req.body.opened,
        req.body.deadline,
        req.body.brief,
        10,
      ]
    );
  } catch (err) {
    console.log("ERROR");
    console.error(err.message);
  }
});

// Login / Signup
app.post("/api/createAccount", async (req, res) => {
  try {
    console.log(req.body);
    const uniqueSalt = bcrypt.genSaltSync(10);
    const saltPassword = bcrypt.hashSync(req.body.password, uniqueSalt);
    const createAccount = await pool.query(
      "INSERT INTO users (email, firstname, lastname, password) VALUES($1, $2, $3, $4) RETURNING *",
      [req.body.email, req.body.firstName, req.body.lastName, saltPassword]
    );

    res.json("finished");
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/api/login", async (req, postResult) => {
  try {
    const actualPassword = pool.query(
      "SELECT password FROM users WHERE email = $1",
      [req.body.email],
      function (err, res) {
        var loggedInVal = false;
        var emailVal = null;
        if (err) {
        } else {
          // Need to add validation when password does not exist, add error codes?
          var hash = res.rows[0].password;
          bcrypt.compare(req.body.password, hash, function (err, result) {
            if (result == true) {
              console.log("Logged in");
              loggedInVal = true;
              emailVal = req.body.email;
            } else {
              console.log("Incorrect password or email");
            }
            postResult.json({ loggedIn: loggedInVal, email: emailVal });
          });
        }
      }
    );
  } catch (err) {
    console.error(err.message);
  }
});

// Create feature
app.post("/api/createFeature", async (req, res) => {
  try {
    console.log(req.body);
    // Insert the feature into the databasea
    const createFeature = await pool.query(
      "INSERT INTO features (projectid, featurename, starttime, endtime, completed, priority, currentrisk, progress, difficulty) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        req.body.projectid,
        req.body.featureName,
        req.body.startTime,
        req.body.endTime,
        req.body.completed,
        req.body.priority,
        req.body.currentRisk,
        req.body.progress,
        req.body.difficulty,
      ]
    );
    // Get the feature id
    const featureId = await pool.query(
      "SELECT featureid FROM features WHERE projectid = $1 AND featurename = $2",
      [req.body.projectid, req.body.featureName]
    );

    // Get the IDs of the dependencies
    const dependencyLength = req.body.dependencies.length;
    const dependencyIds = [];
    const dependencies = req.body.dependencies[dependencyLength - 1];
    for (let i = 0; i < dependencyLength; i++) {
      const depName = dependencies[i].label;
      const depID = await pool.query(
        "SELECT featureid FROM features WHERE projectid = $1 AND featurename = $2",
        [req.body.projectid, depName]
      );
      dependencyIds.push(depID.rows[0]);
    }

    // Insert dependencies into dependency table
    for (let k = 0; k < dependencyLength; k++) {
      const insertDependency = await pool.query(
        "INSERT INTO featuredep (featureid,depid) VALUES ($1, $2)",
        [featureId.rows[0].featureid, dependencyIds[k].featureid]
      );
    }
  } catch (err) {
    console.log("error");
    console.error(err.message);
  }
});

// Get all features
app.post("/api/features", async (req, postRes) => {
  try {
    const allFeatures = await pool.query(
      "SELECT * FROM features WHERE projectid = $1",
      [req.body.projectid]
    );
    if (allFeatures.rows.length == 0) {
      return postRes.json(null);
    } else {
      postRes.json(allFeatures.rows);
    }
  } catch (err) {
    console.error(err.message);
  }
});
// Get all projects
app.post("/api/projects", async (req, postRes) => {
  try {
    const allFeatures = await pool.query(
      "SELECT projectid, projectname, CONCAT(firstname, ' ', lastname) as projectManager, deadline, closed, ((EXTRACT(DAY FROM (opened -  NOW()))) / (EXTRACT(DAY FROM (deadline - NOW())))) as progress FROM (SELECT projectid, projectname, deadline, opened, closed FROM projects NATURAL JOIN userproject WHERE userid = 1) AS subquery1 NATURAL JOIN (SELECT projectid, userid FROM userproject WHERE ismanager) AS subquery2 NATURAL JOIN users;"
    );
    if (allFeatures.rows.length == 0) {
      return postRes.json(null);
    } else {
      postRes.json(allFeatures.rows);
    }
  } catch (err) {
    console.error(err.message);
  }
});
// Get all bugs

// Get all notifcations
app.post("/api/notifications", async (req, postRes) => {
  try {
    const userId = await pool.query(
      "SELECT userid FROM users WHERE email = $1;",
      [req.body.email]
    );
    const allNotifications = await pool.query(
      "SELECT COUNT(*) FROM notifications WHERE userid = $1",
      [userId.rows[0].count]
    );
    if (allNotifications.rows.length == 0) {
      return postRes.json("0");
    } else {
      postRes.json(allNotifications.rows[0].count);
    }
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/api/minimize-overlapping-tasks", async (req, res) => {
  const projectid = req.body.projectid;
  let tasks = await pool.query(
    "SELECT featureid, starttime, endtime FROM features WHERE projectid = $1",
    [projectid]
  );

  tasks = tasks.rows;

  res.json(sortedTasks);
});

app.post("/api/dependencies", async (req, postRes) => {
  try {
    // console.log(req.body);

    const allFeatures = await pool.query(
      "SELECT featurename, featureid FROM features INNER JOIN (SELECT depid from featuredep WHERE featureid = $1) as o1 on features.featureid = o1.depid;",
      [req.body.featureid]
    );
    if (allFeatures.rows.length == 0) {
      return postRes.json(null);
    } else {
      // console.log(allFeatures.rows);
      postRes.json(allFeatures.rows);
    }
  } catch (err) {
    console.error(err.message);
  }
});
//ACTIVe: select count(*) from userproject where userid = <userid here>;

app.post("/api/activeProjects", async (req, postRes) => {
  try {
    const userId = await pool.query(
      "SELECT userid FROM users WHERE email = $1;",
      [req.body.email]
    );
    // console.log(userId.rows[0]);
    const projectCount = await pool.query(
      "SELECT COUNT(*) from userproject where userid = $1;",
      [userId.rows[0].userid]
    );
    // console.log(projectCount.rows[0].count);
    if (projectCount.rows.length == 0) {
      return postRes.json("0");
    } else {
      postRes.json(projectCount.rows[0].count);
    }
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/api/featureCount", async (req, postRes) => {
  try {
    const featureCount = await pool.query(
      "SELECT COUNT(*) AS count FROM userproject WHERE userid = (SELECT userid FROM users WHERE email = $1) "[
        req.body.email
      ]
    );
    if (featureCount.rows.length == 0) {
      return postRes.json(null);
    } else {
      postRes.json(featureCount.rows);
    }
  } catch (err) {
    console.error(err.message);
  }
});

// Get all dependencies for a feature
app.post("/api/dependencies", async (req, postRes) => {
  try {
    // console.log(req.body);

    const allFeatures = await pool.query(
      "SELECT featurename, featureid features INNER JOIN (SELECT depid from featuredep WHERE featureid = $1) as o1 on features.featureid = o1.depid;",
      [req.body.featureid]
    );
    if (allFeatures.rows.length == 0) {
      return postRes.json(null);
    } else {
      // console.log(allFeatures.rows);
      postRes.json(allFeatures.rows);
    }
  } catch (err) {
    console.error(err.message);
  }
});

//SELECT deadline - NOW() FROM projects where projectid = 1

app.post("/api/timeLeft", async (req, postRes) => {
  try {
    // console.log(req.body);

    const timeLeft = await pool.query(
      "SELECT deadline - NOW() as remaining, deadline - (Now()-opened) as completed FROM projects where projectid = $1;",
      [req.body.projectid]
    );
    if (timeLeft.rows.length == 0) {
      return postRes.json(null);
    } else {
      // console.log(allFeatures.rows);
      postRes.json(timeLeft.rows);
    }
  } catch (err) {
    console.error(err.message);
  }
});

// Topo sort
app.post("/api/topoSort", async (req, res) => {
  try {
    const dependencies = new Map(req.body.adj);
    // create an array of edges from the dependencies hash map
    let edges = [];
    for (let [featureId, dependencyIds] of dependencies.entries()) {
      dependencyIds.forEach((dependencyId) =>
        edges.push([dependencyId, featureId])
      );
    }
    // perform topological sorting using the edges array
    const sortedFeatureIds = topoSort(edges);

    // For each feature
    for (let i = 0; i < sortedFeatureIds.length; i++) {
      let featureid = sortedFeatureIds[i];

      const duration = await pool.query(
        "SELECT (endtime - starttime) as duration from features WHERE projectid = $1 AND featureid = $2",
        [req.body.projectid, featureid]
      );
      //SELECT featurename, endtime FROM features JOIN featuredep ON features.featureid = featuredep.depid WHERE featuredep.featureid = 5 AND projectid = 1 ORDER BY endtime DESC LIMIT 1;
      let latestEndTime = await pool.query(
        "SELECT features.featurename, endtime FROM features JOIN featuredep ON features.featureid = featuredep.depid WHERE featuredep.featureid = $1 AND projectid = $2 ORDER BY endtime DESC LIMIT 1;",
        [featureid, req.body.projectid]
      );

      if (latestEndTime.rows.length == 0) {
        console.log("Updating to project start time");
        latestEndTime = await pool.query(
          "SELECT featurename, starttime as endtime from features WHERE projectid = $1 ORDER BY starttime ASC LIMIT 1;",
          [req.body.projectid]
        );
      }

      await pool.query(
        "UPDATE features SET starttime = $1 ,endtime = ($1 :: TIMESTAMP +  $2)  WHERE featureid = $3 AND projectid = $4;",
        [
          latestEndTime.rows[0].endtime,
          duration.rows[0].duration,
          featureid,
          req.body.projectid,
        ]
      );
    }
    res.json(sortedFeatureIds);
  } catch (err) {
    console.error(err.message);
  }
});

async function predict(test_array) {

	// This variable contains the data
	// you want to send
	var data = {
		array: test_array
	}

    // preparing the post request
	var options = {
		method: 'POST',

		// http:flaskserverurl:port/route
		uri: 'http://127.0.0.1:5000/predict',
		body: data,

		// Automatically stringifies
		// the body to JSON
		json: true
	};

	var sendrequest = await request(options)

		// The parsedBody contains the data
		// sent back from the Flask server
		.then(function (parsedBody) {
			console.log(parsedBody);
			
			// You can do something with
			// returned data
			let result;
			result = parsedBody['result'];
			console.log("The probability of project success: ", result);
		})
		.catch(function (err) {
			console.log(err);
		});
}

var test_input_1 = [[0.51342282, 0.84380054, 0.7717033, 0.34, 0.624,0.68704923]]
var test_input_2 = [[0.67676768, 0.03678401, 0.70619826, 0.21, 0.212, 0.32635373]]
predict(test_input_1);
predict(test_input_2);

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
