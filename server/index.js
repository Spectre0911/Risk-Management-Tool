import { createRequire } from "module";
import { fileURLToPath } from "url";

import bcrypt from "bcryptjs";
import path from "path";

const require = createRequire(import.meta.url);
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db.cjs");

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

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/addbug", async (req, res) => {
  try {
    const { bugDetails } = req.body.values;
    console.log(bugDetails);
    const addbug = await pool.query(
      "INSERT INTO bugs (featureid, devid, bugname, bugdesc, priority, severity) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        1,
        2,
        req.body.values.bugName,
        req.body.values.bugDescription,
        req.body.values.priority,
        req.body.values.severity,
      ]
    );

    res.json("finished");
  } catch (err) {
    console.error(err.message);
  }
});

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

    const createFeature = await pool.query(
      "INSERT INTO features (projectid, featurename, starttime, endtime, completed, priority, currentrisk, progress) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        req.body.projectid,
        req.body.featureName,
        req.body.startTime,
        req.body.endTime,
        req.body.completed,
        req.body.priority,
        req.body.currentRisk,
        req.body.progress,
      ]
    );

    res.json("finished");
  } catch (err) {
    console.log("error");
    console.error(err.message);
  }
});

//get all features
app.post("/api/features", async (req, postRes) => {
  try {
    console.log("Hello");

    const allFeatures = await pool.query(
      "SELECT * FROM features WHERE projectid = $1",
      [req.body.projectid]
    );
    console.log(allFeatures.rows.length);
    if (allFeatures.rows.length == 0) {
      return postRes.json(null);
    } else {
      postRes.json(allFeatures.rows);
    }
    console.log("Hello");
  } catch (err) {
    console.log("Hello");

    console.error(err.message);
  }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.end("Error");
  }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
