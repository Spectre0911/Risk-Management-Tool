import { createRequire } from "module";
import { fileURLToPath } from "url";

import bcrypt from "bcryptjs";
import path, { resolve } from "path";
import { create } from "domain";
// import { reverse } from "dns";
// import { user } from "pg/lib/defaults.js";

const require = createRequire(import.meta.url);
var request = require("request-promise"); // to connect to the ML server
const express = require("express");
const app = express();
var cors = require("cors");
const pool = require("./db.cjs");
const multer = require("multer");
const topoSort = require("toposort"); // you will need to install this package
const fs = require("fs");

//middleware
app.use(cors());
app.use(express.json()); //req.body

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//ROUTES//
// Route for uploading an image
const upload = multer({
  dest: "../server/public/assets",
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

const handleError = (err, res) => {
  console.log(err);
  res.status(500).contentType("text/plain").end("Oops! Something went wrong!");
};

app.post(
  "/upload",
  upload.single("file" /* name attribute of <file> element in your form */),
  (req, res) => {
    console.log(req.file);
    console.log(req.file.path);
    try {
      const tempPath = req.file.path;
      const targetPath = path.join(__dirname, "public/assets/");

      if (true) {
        fs.rename(
          tempPath,
          path.join(targetPath, req.file.originalname),
          (err) => {
            if (err) return handleError(err, res);
            res.status(200).contentType("text/plain").end("File uploaded!");
          }
        );
      } else {
        fs.unlink(tempPath, (err) => {
          if (err) return handleError(err, res);

          res
            .status(403)
            .contentType("text/plain")
            .end("Only .png files are allowed!");
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
);

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
    // Create project
    console.log(req.body);
    const projects = await pool.query(
      "INSERT INTO projects (projectname, closed, opened, deadline, brief, budget) VALUES($1, $2, $3, $4, $5, $6)",
      [
        req.body.projectName,
        req.body.closed,
        req.body.opened,
        req.body.deadline,
        req.body.brief,
        10,
      ]
    );

    const projectidRows = await pool.query(
      "SELECT projectid FROM projects ORDER BY projectid DESC LIMIT 1"
    );
    const projectid = projectidRows.rows[0].projectid;
    // INSERT all skills
    req.body.skills.map((item) => {
      pool.query(
        "INSERT INTO projectskill (projectid, skill) VALUES($1, $2);",
        [projectid, item.label]
      );
    });
    pool.query(
      "INSERT INTO userproject (userid, projectid, ismanager) VALUES((SELECT userid FROM users WHERE email = $1), $2, True);",
      [req.body.email.email, projectid]
    );
    // res.sendStatus(200);
  } catch (err) {
    console.log("ERROR");
    console.error(err.message);
  }
});

// Login / Signup
app.post("/api/createAccount", async (req, res) => {
  try {
    const uniqueSalt = bcrypt.genSaltSync(10);
    const saltPassword = bcrypt.hashSync(req.body.password, uniqueSalt);
    const createAccount = await pool.query(
      "INSERT INTO users (email, firstname, lastname, pfppath ,password) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [
        req.body.email,
        req.body.firstName,
        req.body.lastName,
        req.body.pfpPath,
        saltPassword,
      ]
    );

    // res.json("finished");
    res.sendStatus(200);
    // console.log("registered");
  } catch (err) {
    console.error(err.message);
    res.sendStatus(400);
  }
});
// Get project name
app.post("/api/projectName", async (req, res) => {
  try {
    // console.log(req.body);

    const createAccount = await pool.query(
      "SELECT name FROM projects WHERE projectid = $1",
      [req.body.projectid]
    );

    res.json("finished");
  } catch (err) {
    console.error(err.message);
  }
});

// Get all tasks to complete
app.post("/api/taskToComplete", async (req, res) => {
  try {
    // console.log(req.body);

    const getTasks = await pool.query(
      "SELECT projects.projectid, projectname, featureinfo.featureid, featurename, tasks.taskid, taskname, priority, status, extract(day from (endtime - current_date)) as daysleft FROM projects INNER JOIN (SELECT featureid, featurename, projectid FROM features) AS featureinfo ON projects.projectid = featureinfo.projectid INNER JOIN tasks ON featureinfo.featureid = tasks.featureid WHERE devid = (SELECT userid FROM users WHERE email = $1);",
      [req.body.email]
    );
    // console.log(createAccount.rows);
    res.json(getTasks.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Get all tasks to complete for a project id
app.post("/api/taskToCompletePID", async (req, res) => {
  try {
    const tasksToComplete = await pool.query(
      "SELECT projects.projectid, projectname, featureinfo.featureid, featurename, tasks.taskid, taskname, priority, status, extract(day from (endtime - current_date)) as daysleft FROM projects INNER JOIN (SELECT featureid, featurename, projectid FROM features) AS featureinfo ON projects.projectid = featureinfo.projectid INNER JOIN tasks ON featureinfo.featureid = tasks.featureid WHERE devid = (SELECT userid FROM users WHERE email = $1) and projects.projectid = $2;",
      [req.body.email, req.body.projectid]
    );
    // console.log(createAccount.rows);
    res.json(tasksToComplete.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/api/addTeamMember", async (req, res) => {
  try {
    const add = await pool.query(
      "INSERT INTO userproject (userid, projectid, ismanager) VALUES($1, $2, false) RETURNING *",
      [req.body.userid, req.body.projectid]
    );

    const recordAdd = await pool.query(
      "INSERT INTO replacements (projectid, dateChanged, changeType) VALUES($1, $2, $3)",
      [req.body.projectid, Date.now(), 1]
    );

    res.statusCode(200);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/api/removeTeamMember", async (req, res) => {
  try {
    const remove = await pool.query(
      "DELETE FROM userproject WHERE userproject.userid = $1, userproject.projectid = $2",
      [req.body.userid, req.body.projectid]
    );

    const recordRemove = await pool.query(
      "INSERT INTO replacements (projectid, dateChanged, changeType) VALUES($1, $2, $3)",
      [req.body.projectid, Date.now(), 0]
    );
  } catch (err) {
    console.log(err.message);
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
    // Insert the feature into the database
    const createFeature = await pool.query(
      "INSERT INTO features (projectid, featurename, starttime, endtime, completed, priority, currentrisk, progress, difficulty, status) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, 1) RETURNING *",
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

    // recording the change in features
    const recordChange = await pool.query(
      "INSERT INTO featureChange (projectid, priority, dateChanged) VALUES ($1, $2)",
      [req.body.projectid, req.body.priority, Date.now()]
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

    // Get all information about a user

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

app.post("/api/deleteFeature", async (req, res) => {
  try {
    console.log(req.body);
    const deleteFeature = await pool.query(
      "DELETE FROM features WHERE featureid = $1",
      [req.body.featureId]
    );
  } catch (err) {
    console.log(err.message);
  }
});

// Get all features
app.post("/api/features", async (req, postRes) => {
  try {
    // console.log(req.body);
    const allFeatures = await pool.query(
      "SELECT * FROM features WHERE projectid = $1 and completed = false",
      [req.body.projectid]
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

// Complete a feature

app.post("/api/completeFeature", async (req, postRes) => {
  try {
    console.log(req.body);
    await pool.query(
      "UPDATE features SET completed = true WHERE featureid = $1",
      [req.body.featureId]
    );
  } catch (err) {
    console.error(err.message);
  }
});

/*
SELECT featureid, starttime FROM features WHERE projectid = 2 ORDER BY starttime;



SELECT 
  f.featureid,
  EXTRACT(EPOCH FROM LEAST(f.endtime, o.endtime) - GREATEST(f.starttime, o.starttime)) / 60.0 AS overlap_minutes
FROM 
  features AS f 
  JOIN features AS o 
    ON f.projectid = o.projectid 
      AND f.featureid <> o.featureid 
      AND NOT (f.endtime <= o.starttime OR f.starttime >= o.endtime)
WHERE 
  f.featureid = 11                
ORDER BY 
  f.starttime;
*/

app.post("/api/maximumOne", async (req, postRes) => {
  try {
    // Get all the feature ids for a project
    let sortedIds = await pool.query(
      "SELECT featureid, starttime, featurename FROM features WHERE projectid = $1 ORDER BY starttime ASC;",
      [req.body.projectid]
    );
    let featureidList = sortedIds.rows.map((item) => item.featureid);
    let resolvedIds = new Set();

    // Loop through all the featureids to resolve all overlaps
    // console.log(resolvedIds.size);
    // console.log(featureidList.length);

    while (resolvedIds.size != featureidList.length) {
      console.log("Changed");

      sortedIds = await pool.query(
        "SELECT featureid, starttime, featurename FROM features WHERE projectid = $1 ORDER BY endtime ASC;",
        [req.body.projectid]
      );
      featureidList = sortedIds.rows.map((item) => item.featureid);

      let i = 0;
      while (resolvedIds.has(featureidList[i])) {
        i += 1;
      }

      // Get the current feature id
      let currentFeatureid = featureidList[i];

      // Find feature with the greatest overlap time
      const featureidOverlaps = await pool.query(
        "SELECT f2.featureid, f2.featurename, CEIL(EXTRACT(EPOCH FROM LEAST(f1.endtime, f2.endtime) - GREATEST(f1.starttime, f2.starttime)) / 86400) AS overlap_length_days FROM features f1 JOIN features f2 ON f1.projectid = f2.projectid AND f1.featureid <> f2.featureid WHERE f1.featureid = $1 AND f2.starttime < f1.endtime AND f2.endtime > f1.starttime ORDER BY overlap_length_days DESC LIMIT 1;",
        [currentFeatureid]
      );

      if (featureidOverlaps.rows.length > 0) {
        for (let j = i + 1; j < featureidList.length; j++) {
          let featureId = featureidList[j];
          if (featureId != currentFeatureid) {
            await pool.query(
              "UPDATE features SET endtime = endtime + $1 *  INTERVAL '1 day', starttime = starttime + $1 * INTERVAL '1 day' WHERE featureid = $2",
              [featureidOverlaps.rows[0].overlap_length_days, featureId]
            );
          }
        }
      }
      resolvedIds.add(currentFeatureid);
    }
  } catch (err) {
    // console.log("ERROR");
    console.error(err.message);
  }
});

// Get all projects
app.post("/api/projects", async (req, postRes) => {
  try {
    // console.log(req.body);
    const allFeatures = await pool.query(
      "SELECT * FROM (SELECT projectid, projectname, deadline, opened, (EXTRACT(epoch FROM CURRENT_TIMESTAMP - opened) / EXTRACT(epoch FROM deadline - opened)) * 100 AS progress, closed FROM projects NATURAL JOIN userproject WHERE userid = (SELECT userid FROM users WHERE email = $1) and ismanager = true) AS subquery1 NATURAL JOIN (SELECT projectid, userid FROM userproject WHERE ismanager) AS subquery2 NATURAL JOIN users WHERE closed = false;",
      [req.body.email]
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

app.post("/api/getImagePath", async (req, postRes) => {
  try {
    const pfp = await pool.query(
      "SELECT pfppath FROM users WHERE email = $1; ",
      [req.body.email]
    );
    if (pfp.rows.length == 0) {
      return postRes.json(null);
    } else {
      postRes.json(pfp.rows[0].pfppath);
    }
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/api/getImagePathById", async (req, postRes) => {
  try {
    console.log(req.body.id);
    const pfp = await pool.query(
      "SELECT pfppath FROM users WHERE userid = $1; ",
      [req.body.id]
    );
    console.log(pfp);
    if (pfp.rows.length == 0) {
      return postRes.json(null);
    } else {
      postRes.json(pfp.rows[0].pfppath);
    }
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/api/GitubDetails", async (req, postRes) => {
  try {
    console.log(req.body.projectId);
    const githubToken = await pool.query(
      "SELECT githubtoken FROM users WHERE email= $1; ",
      [req.body.email]
    );
    const ownerName = await pool.query(
      "SELECT githubuname FROM users WHERE email= $1; ",
      [req.body.email]
    );
    const repoName = await pool.query(
      "SELECT githubrepo FROM projects WHERE projectid= $1; ",
      [req.body.projectId]
    );
    const result = [
      githubToken.rows[0].githubtoken,
      ownerName.rows[0].githubuname,
      repoName.rows[0].githubrepo,
    ];
    postRes.json(result);
    // if (githubToken.rows.length == 0) {
    //   return postRes.json(null);
    // } else {
    //   postRes.json(githubToken.rows[0].githubtoken, repoName.rows[0].githubrepo);
    // }
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/api/editImagePath", async (req, postRes) => {
  try {
    await pool.query("UPDATE USERS SET pfppath = $1 WHERE email = $2", [
      req.body.path,
      req.body.email.email,
    ]);
  } catch (err) {
    console.error(err.message);
  }
});

// End project
app.post("/api/endProject", async (req, postRes) => {
  try {
    // console.log(req.body);
    await pool.query("DELETE FROM projects WHERE projectid = $1;", [
      req.body.projectid,
    ]);
  } catch (err) {
    console.error(err.message);
  }
});

// Get all bugs
app.post("/api/allBugs", async (req, postRes) => {
  try {
    const allBugs = await pool.query(
      "SELECT bugid, featureid, devid, assigner, bugname, bugdesc, location, priority, severity FROM ((SELECT projectid, featureid FROM (projects NATURAL JOIN features) as projectFeatures) as pf NATURAL JOIN bugs) WHERE projectid = $1;",
      [req.body.projectid]
    );

    if (allBugs.rows.length == 0) {
      return postRes.json([]);
    } else {
      postRes.json(allBugs.rows);
    }
  } catch (err) {
    console.error(err.message);
  }
});

// Get all projects
app.post("/api/githubToken", async (req, postRes) => {
  try {
    // console.log(req.body);
    const accessToken = await pool.query(
      "SELECT githubtoken FROM users WHERE email=$1",
      [req.body.email]
    );
    const repoName = await pool.query(
      "SELECT githubrepo FROM projects WHERE projectid=$1",
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

// Get all notifcations
app.post("/api/notifications", async (req, postRes) => {
  try {
    // console.log("notifications");
    // console.log(req.body);
    const userId = await pool.query(
      "SELECT userid FROM users WHERE email = $1;",
      [req.body.email]
    );

    const allNotifications = await pool.query(
      "SELECT COUNT(*) FROM notifications WHERE userid = $1 and notiftype = $2",
      [userId.rows[0].userid, req.body.type]
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

// Get location specific notifications
app.post("/api/locationNotifications", async (req, postRes) => {
  try {
    // console.log("locationNotifications");
    const userId = await pool.query(
      "SELECT userid FROM users WHERE email = $1;",
      [req.body.email]
    );
    const allNotifications = await pool.query(
      "SELECT notifid, location, projectid, title, message as description, notiftype  FROM notifications WHERE userid = $1 and location = $2",
      [userId.rows[0].userid, req.body.location]
    );
    // console.log(allNotifications.rows);

    // console.log(allNotifications.rows);
    if (allNotifications.rows.length == 0) {
      return postRes.json([]);
    } else {
      return postRes.json(allNotifications.rows);
    }
  } catch (err) {
    console.error(err.message);
  }
});

// Get all members for a project
app.post("/api/projectMembers", async (req, postRes) => {
  try {
    // console.log(req.body);
    const projectMembers = await pool.query(
      "SELECT userid, CONCAT(firstname, ' ', lastname) as name, bio FROM users NATURAL JOIN userproject WHERE projectid = $1;",
      [req.body.projectId]
    );
    if (projectMembers.rows.length == 0) {
      return postRes.json([]);
    } else {
      postRes.json(projectMembers.rows);
    }
  } catch (err) {
    console.error(err.message);
  }
});

// create Bug
app.post("/api/createBug", async (req, postRes) => {
  console.log("CREATING BUG");
  try {
    console.log(req.body);
    const createBug = await pool.query(
      "INSERT INTO bugs(featureid, devid, bugname, bugdesc, priority, severity, location, assigner) VALUES ($1, $2, $3, $4, $5, $6, $7, (SELECT userid FROM users WHERE email = $8))",
      [
        req.body.featureid,
        req.body.devid,
        req.body.bugName,
        req.body.bugDescription,
        req.body.priority,
        req.body.severity,
        req.body.bugLocation,
        req.body.email,
      ]
    );
  } catch (err) {
    console.error(err.message);
  }
});

// create Bug
app.post("/api/createTask", async (req, postRes) => {
  console.log("CREATING TASK");
  try {
    console.log(req.body);
    await pool.query(
      "INSERT INTO tasks(featureid, devid, taskname, description, starttime, endtime, priority, status) VALUES($1, $2, $3, $4, (SELECT starttime FROM features WHERE featureid = $1), (SELECT endtime FROM features WHERE featureid = $1), $5, 1)",
      [
        req.body.featureid,
        req.body.devid,
        req.body.name,
        req.body.description,
        req.body.priority,
      ]
    );
  } catch (err) {
    console.error(err.message);
  }
});

// Get all skills for a team member on id
app.post("/api/memberSkills", async (req, postRes) => {
  try {
    const skills = await pool.query(
      "SELECT * from userskill WHERE userid = $1;",
      [req.body.userid]
    );
    if (skills.rows.length == 0) {
      return postRes.json([
        {
          userid: req.body.userid,
          skill: null,
          sktype: null,
          sklevel: 0,
        },
      ]);
    } else {
      postRes.json(skills.rows);
    }
  } catch (err) {
    console.error(err.message);
  }
});

// Get all possible skills
app.post("/api/skills", async (req, postRes) => {
  try {
    const skills = await pool.query(
      "SELECT skill as value, skill as label, '0' as experience from skills;"
    );

    postRes.json(skills.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Update a users information
app.post("/api/updateUser", async (req, postRes) => {
  try {
    console.log(req.body);
    const firstNameLastName = req.body.values.name.split(" ");
    // console.log(firstNameLastName);
    // Update user table

    const userId = await pool.query(
      "SELECT userid FROM users WHERE email = $1;",
      [req.body.userEmail.email]
    );
    await pool.query(
      "UPDATE USERS SET firstname = $1, lastname = $2, email = $3, githubtoken = $4, bio = $6 WHERE email = $5",
      [
        firstNameLastName[0],
        firstNameLastName[1],
        req.body.values.email,
        req.body.values.gitHubToken,
        req.body.userEmail.email,
        req.body.values.bio,
      ]
    );
    // Delete all exisiting skills in the table
    await pool.query("DELETE FROM userskill WHERE userid = $1", [
      userId.rows[0].userid,
    ]);

    // Update user skills table
    const skills = req.body.skills;
    skills.map(async (skill) => {
      await pool.query(
        "INSERT INTO userskill (userid, skill, sklevel) VALUES ($1, $2, $3)",
        [userId.rows[0].userid, skill.value, skill.experience]
      );
    });

    // postRes.json(skills.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/api/adminSkills", async (req, postRes) => {
  try {
    // console.log(req.body.email);
    const skills = await pool.query(
      "SELECT skill as value, skill as label, sklevel as experience from userskill WHERE userid = (SELECT userid FROM users where email = $1);",
      [req.body.email.email]
    );
    if (skills.rows.length == 0) {
      return postRes.json([
        {
          value: "null",
          label: "null",
          experience: 0,
        },
      ]);
    } else {
      postRes.json(skills.rows);
    }
  } catch (err) {
    console.error(err.message);
  }
});

// Get all teammembers for a project

app.post("/api/minimize-overlapping-tasks", async (req, res) => {
  const projectid = req.body.projectid;
  let tasks = await pool.query(
    "SELECT featureid, starttime, endtime FROM features WHERE projectid = $1",
    [projectid]
  );

  tasks = tasks.rows;

  res.json(sortedTasks);
});
// Get notification data:

// app.post("/api/notificationInfo", async (req, postRes) => {
//   try {
//     console.log(req.body);
//     const userId = await pool.query(
//       "SELECT userid FROM users WHERE email = $1;",
//       [req.body.email]
//     );
//     console.log(userId.rows);
//     const allNotifications = await pool.query(
//       "SELECT * FROM notifications WHERE userid = $1;",
//       [userId]
//     );
//     if (allNotifications.rows.length == 0) {
//       return postRes.json(null);
//     } else {
//       // console.log(allFeatures.rows);
//       postRes.json(allNotifications.rows);
//     }
//   } catch (err) {
//     console.error(err.message);
//   }
// });

app.post("/api/dependencies", async (req, postRes) => {
  try {
    // console.log(req.body);

    const dependencies = await pool.query(
      "SELECT featurename, featureid FROM features INNER JOIN (SELECT depid from featuredep WHERE featureid = $1) as o1 on features.featureid = o1.depid;",
      [req.body.featureid]
    );
    if (dependencies.rows.length == 0) {
      return postRes.json(null);
    } else {
      // console.log(allFeatures.rows);
      postRes.json(dependencies.rows);
    }
  } catch (err) {
    console.error(err.message);
  }
});

// Get information relating to a user for an email
app.post("/api/user", async (req, postRes) => {
  try {
    if (req.body.email != null) {
      const userId = await pool.query(
        "SELECT userid FROM users WHERE email = $1;",
        [req.body.email.email]
      );

      const userInfo = await pool.query(
        "SELECT CONCAT(firstname, ' ', lastname) as Name, email, githubtoken, bio FROM users WHERE userid = $1",
        [userId.rows[0].userid]
      );
      postRes.json(userInfo.rows[0]);
    } else {
      console.log("Getting info for id");

      const userInfo = await pool.query(
        "SELECT CONCAT(firstname, ' ', lastname) as Name, email, githubtoken, bio FROM users WHERE userid = $1",
        [req.body.userid]
      );
      postRes.json(userInfo.rows[0]);
    }
  } catch (err) {
    console.error(err.message);
  }
});

// // Get information relating to a user for an id
// app.post("/api/user", async (req, postRes) => {
//   try {
//     const userId = await pool.query(
//       "SELECT userid FROM users WHERE email = $1;",
//       [req.body.email.email]
//     );

//     const userInfo = await pool.query(
//       "SELECT CONCAT(firstname, ' ', lastname) as Name, email, githubtoken, bio FROM users WHERE userid = $1",
//       [userId.rows[0].userid]
//     );
//     postRes.json(userInfo.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });
// Get information for all users
app.post("/api/orderedUsers", async (req, postRes) => {
  let projectSkillSet = [];
  let intersectionUserCount = new Map();

  try {
    // Get all the skills required for the project
    const projectSkills = await pool.query(
      "SELECT * FROM projectskill WHERE projectid = $1",
      [req.body.projectId]
    );
    projectSkills.rows.map((skill) => {
      projectSkillSet.push(skill.skill);
    });
    projectSkillSet = new Set(projectSkillSet);
    // Get all the users from the db
    const allUsers = await pool.query("SELECT * FROM users");
    await Promise.all(
      allUsers.rows.map(async (user) => {
        let userSkillSet = [];
        // Get all skills from the users users id
        const userSkills = await pool.query(
          "SELECT * FROM userskill WHERE userid = $1",
          [user.userid]
        );
        await Promise.all(
          userSkills.rows.map((skill) => {
            userSkillSet.push(skill.skill);
          })
        );
        userSkillSet = new Set(userSkillSet);
        let intersection = new Set(
          [...projectSkillSet].filter((x) => userSkillSet.has(x))
        );

        intersectionUserCount.set(
          { value: user.userid, label: user.firstname + " " + user.lastname },
          intersection.size
        );
      })
    );
    intersectionUserCount = new Map(
      Array.from(intersectionUserCount).sort((a, b) => b[1] - a[1])
    );
    // console.log(Array.from(intersectionUserCount.keys()));
    postRes.json(Array.from(intersectionUserCount.keys()));
  } catch (err) {
    console.error(err.message);
  }
});

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

// Get all bugs for a particular project
app.post("/api/bugCount", async (req, postRes) => {
  try {
    const allBugs = await pool.query(
      "select * from bugs inner join features on bugs.featureid = features.featureid where projectid = $1",
      [req.body.projectid]
    );
    // console.log(allBugs.rows);
    postRes.json(allBugs.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Get average score for date
// Get all bugs for a particular project
app.post("/api/averageSoftMetrics", async (req, postRes) => {
  try {
    const averageSoftMetrics = await pool.query(
      "SELECT DATE(fbdate) AS fbdate, AVG(fbscore), fbtype FROM feedback WHERE projectid = $1 GROUP BY DATE(fbdate), fbtype;",
      [req.body.projectid]
    );
    // console.log(allBugs.rows);
    postRes.json(averageSoftMetrics.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Add a hard risk data point
app.post("/api/addRisk", async (req, postRes) => {
  try {
    const averageSoftMetrics = await pool.query(
      "INSERT INTO risks(projectid, riskdate, risk, risktype) VALUES($1, DATE(NOW()), ROUND($2), 1)",
      [req.body.projectid, req.body.risk]
    );
  } catch (err) {
    console.error(err.message);
  }
});

// Retrieve all hard risk data points
app.post("/api/getRisks", async (req, postRes) => {
  try {
    const hardRisk = await pool.query(
      "SELECT DATE(riskdate), AVG(risk) FROM risks WHERE projectid = $1 GROUP BY DATE(riskdate);",
      [req.body.projectid]
    );
    // console.log(allBugs.rows);
    console.log(hardRisk.row);
    postRes.json(hardRisk.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//select count(*) from (select * from tasks inner join features on tasks.featureid = features.featureid where projectid = <projectid here> and devid = <userid here> and not completed) as tasksleft;
// Get all task for a particular project
// app.post("/api/assignedProjects", async (req, postRes) => {
//   try {
//     // console.log(req.body);

//     const projects = await pool.query(
//       "select projectid, projectname, userid, concat(firstname,' ', lastname), opened, taskstodo, deadline, extract(day from (deadline - current_date)) as daysleft from (select * from users natural join userproject natural join projects where ismanager) as managers natural join (select projectid, count(taskid) as taskstodo from tasks inner join features on tasks.featureid = features.featureid group by projectid) as featuretask WHERE userid = (SELECT userid FROM users WHERE email = $1);",
//       [req.body.email]
//     );

//     postRes.json(projects.rows);
//   } catch (err) {
//     console.error(err.message);
//   }
// });
// Assigned Project Summary
app.post("/api/assignedProjects", async (req, postRes) => {
  try {
    const assignedProjects = await pool.query(
      "SELECT projectid, projectname, opened, deadline, CONCAT(firstname, ' ', lastname) as name, extract(day from (deadline - current_date)) as daysleft FROM (SELECT projectid, projectname, opened, deadline,(SELECT userid FROM userproject WHERE projectid =  projectUserInfo.projectid and ismanager = true) FROM (projects NATURAL JOIN userproject) as projectUserInfo WHERE userid = (SELECT userid FROM users WHERE email = $1) and ismanager = false) as o1 NATURAL JOIN users;",
      [req.body.email]
    );
    let taskCounts = [];
    for (let i = 0; i < assignedProjects.rows.length; i++) {
      let currentProjectId = assignedProjects.rows[i].projectid;
      const allTasks = await pool.query(
        "SELECT COUNT(*) FROM (projects NATURAL JOIN features) as o1 NATURAL JOIN tasks as o2 WHERE projectid = $1",
        [assignedProjects.rows[0].projectid]
      );
      let newObject = {
        ...assignedProjects.rows[i],
        ...allTasks.rows[0],
      };
      taskCounts.push(newObject);
    }
    postRes.json(taskCounts);
  } catch (err) {
    console.error(err.message);
  }
});

// INSERT FEEDBACK ()
app.post("/api/insertFeedback", async (req, postRes) => {
  try {
    console.log(req.body);
    const insertFeedback = await pool.query(
      "INSERT INTO feedback(userid, projectid, fbdate, fbtype, fbquestion, fbscore) VALUES((SELECT userid FROM users WHERE email = $1), $2, $3, $4, $5, $6)",
      [
        req.body.email.email,
        2,
        req.body.fbdate,
        req.body.fbtype,
        req.body.fbquestion,
        req.body.fbscore,
      ]
    );
  } catch (err) {
    console.error(err.message);
  }
});

// Retrieve soft skills Score
app.post("/api/softSkillsScore", async (req, postRes) => {
  try {
    const communicationScore = await pool.query(
      "SELECT projectid, AVG(fbscore) FROM feedback WHERE fbtype = $1 AND projectid = $2 GROUP BY projectid;",
      [req.body.fbtype, req.body.projectid]
    );
    console.log(communicationScore.rows);

    postRes.json(communicationScore.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//SELECT deadline - NOW() FROM projects where projectid = 1
app.post("/api/timeLeft", async (req, postRes) => {
  try {
    // console.log(req.body);

    const timeLeft = await pool.query(
      "SELECT deadline - NOW() as remaining, (Now()-opened) as completed FROM projects where projectid = $1;",
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

app.post("/api/overallrisk", async (req, res) => {
  try {
    // This variable contains the data
    // you want to send
    var data = {
      projectid: req.body.projectId,
    };

    // preparing the post request
    var options = {
      method: "POST",

      // http:flaskserverurl:port/route
      uri: "http://127.0.0.1:5001/predictoveralscore",
      body: data,

      // Automatically stringifies
      // the body to JSON
      json: true,
    };

    var sendrequest = await request(options)
      // The parsedBody contains the data
      // sent back from the Flask server
      .then(function (parsedBody) {
        // console.log(parsedBody);

        // You can do something with
        // returned data
        let result;
        result = parsedBody["result"];
        // return result;
        res.json(parsedBody);
      })
      .catch(function (err) {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
