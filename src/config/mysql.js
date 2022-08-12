const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "seru",
});
connection.connect((error) => {
  if (error) {
    throw error;
  }
  console.log("you are connected");
});

module.exports = connection;
