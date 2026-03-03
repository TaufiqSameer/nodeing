const pg = require("pg");

const pool = new pg.Pool({
  host: "localhost",
  user: "postgres",
  password: "26314",
  database: "airbnb_db",
  port: 5433,
});

module.exports = pool;
