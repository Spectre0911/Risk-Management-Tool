import path from "path";
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

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
  console.log('Before connect');
  const client = await pool.connect();
  console.log('Connected!');
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
      [1,2,req.body.values.bugName, req.body.values.bugDescription, req.body.values.priority, req.body.values.severity],
    );

    res.json("finished");
  } catch (err) {
    console.error(err.message);
  }
});



//get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
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
      id
    ]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
