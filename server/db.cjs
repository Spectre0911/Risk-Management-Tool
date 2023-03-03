const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "root",
  host: "localhost",
  port: 5432,
  database: "riskmanager"
});


pool.connect((err, client, release) => {
  if (err) {
      return console.error('Error acquiring client', err.stack)
  }
  // Do what you have to do with the pool client now
});

module.exports = pool;
