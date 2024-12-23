const mysql = require("mysql2");
require("dotenv").config();


// Setting up the connection to the database
const connection = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "my_gmach",
  });
  
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      process.exit(1);
    }
    console.log("Database connection successful!");
  });
  
  module.exports = connection;  

