import { Sequelize } from "sequelize";
import mysql from "mysql2";

const db = new Sequelize("social_api", "root", "Kifeb99##", {
  host: "localhost",
  dialect: "mysql"
})

export const database = mysql.createConnection({
  database: "social_api",
  user: "root",
  password: "Kifeb99##",
  host: "localhost"
})

export default db;
