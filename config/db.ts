import dotenv from "dotenv";
import mysql from "mysql";

dotenv.config();

const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DEFAULT_DB_HOST,
  port: process.env.DEFAULT_DB_PORT as number | undefined,
  user: process.env.DEFAULT_DB_USER,
  password: process.env.DEFAULT_DB_PASSWORD,
  database: process.env.DEFAULT_DB_NAME,
});

export default db;
