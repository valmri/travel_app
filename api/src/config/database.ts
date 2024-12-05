import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "password",
  port: 5432,
  database: "travel",
});

export default pool;
