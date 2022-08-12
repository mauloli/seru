const connection = require("../../config/mysql");

module.exports = {
  register: (data) =>
    new Promise((resolve, reject) => {
      const querysql = connection.query(
        "INSERT INTO user SET ?",
        data,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: result.insertId,
              ...data,
            };
            delete newResult.password;
            resolve(newResult);
          } else {
            console.log(error);
            reject(new Error(error.sqlMessage));
          }
        }
      );
      console.log(querysql.sql);
    }),
  getUserByEmail: (email) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM user WHERE email = ?",
        email,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            console.log(error);
            reject(new Error(error.sqlMessage));
          }
        }
      );
    }),
};
