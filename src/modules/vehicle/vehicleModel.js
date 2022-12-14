const connection = require("../../config/mysql");

module.exports = {
  getCountVehicle: (filter) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS total from pricelist 
        JOIN vehicle_model as vm on pricelist.model_id = vm.id 
        JOIN vehicle_type as vt on vm.type_id = vt.id
        JOIN vehicle_brand as vb on vt.brand_id=vb.id 
        JOIN vehicle_year as vy on pricelist.year_id = vy.id ${filter}`,
        (error, result) => {
          if (!error) {
            resolve(result[0].total);
          } else {
            console.log(error.sqlMessage);
            reject(new Error(error.sqlMessage));
          }
        }
      );
    }),

  getAllVehicle: (limit, offset, filter) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        `SELECT pl.id,pl.code,pl.price,vm.name as Model,
        vt.name as Type,vb.name as Brand,vy.year FROM pricelist AS pl 
        JOIN vehicle_model as vm on pl.model_id = vm.id 
        JOIN vehicle_type as vt on vm.type_id=vt.id 
        JOIN vehicle_brand as vb on vt.brand_id = vb.id
        JOIN vehicle_year as vy on vy.id = pl.year_id ${filter}
        LIMIT ? OFFSET ?`,
        [limit, offset],
        (error, result) => {
          if (!error) {
            // console.log(res);
            resolve(result);
          } else {
            console.log(error.sqlMessage);
            reject(new Error(error.sqlMessage));
          }
        }
      );
      console.log(query.sql);
    }),

  getVehicleById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT pl.id,pl.code,pl.price,vm.name as Model,
        vt.name as Type,vb.name as Brand FROM pricelist AS pl 
        JOIN vehicle_model as vm on pl.model_id = vm.id 
        JOIN vehicle_type as vt on vm.type_id=vt.id 
        JOIN vehicle_brand as vb on vt.brand_id = vb.id WHERE pl.id = ?`,
        id,
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            console.log(err.sqlMessage);
            reject(new Error(err.sqlMessage));
          }
        }
      );
    }),
  getVehicleByYear: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT pl.id,pl.code,pl.price,vm.name as Model,
        vt.name as Type,vb.name as Brand,vy.year as Year FROM pricelist AS pl 
        JOIN vehicle_model as vm on pl.model_id = vm.id 
        JOIN vehicle_type as vt on vm.type_id=vt.id 
        JOIN vehicle_brand as vb on vt.brand_id = vb.id
        JOIN vehicle_year as vy on pl.year_id = vy.id WHERE vy.id = ?`,
        id,
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            console.log(err.sqlMessage);
            reject(new Error(err.sqlMessage));
          }
        }
      );
    }),

  getVehicleByModel: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT pl.id,pl.code,pl.price,vm.name as Model,
        vt.name as Type,vb.name as Brand,vy.year as Year FROM pricelist AS pl 
        JOIN vehicle_model as vm on pl.model_id = vm.id 
        JOIN vehicle_type as vt on vm.type_id=vt.id 
        JOIN vehicle_brand as vb on vt.brand_id = vb.id
        JOIN vehicle_year as vy on pl.year_id = vy.id WHERE vm.id = ?`,
        id,
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            console.log(err.sqlMessage);
            reject(new Error(err.sqlMessage));
          }
        }
      );
    }),

  getVehicleByCode: (code) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM pricelist WHERE code = ?`,
        code,
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            console.log(err.sqlMessage);
            reject(new Error(err.sqlMessage));
          }
        }
      );
    }),
  getYear: (year) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM vehicle_year WHERE year = ?`,
        year,
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            console.log(err.sqlMessage);
            reject(new Error(err.sqlMessage));
          }
        }
      );
    }),
  getBrand: (name) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM vehicle_brand WHERE name = ?`,
        name,
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            console.log(err.sqlMessage);
            reject(new Error(err.sqlMessage));
          }
        }
      );
    }),
  getType: (name, brand_id) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM vehicle_type WHERE name LIKE '%${name}%' AND brand_id = ?`,
        brand_id,
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            console.log(err.sqlMessage);
            reject(new Error(err.sqlMessage));
          }
        }
      );
    }),
  getModel: (name, type_id) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM vehicle_model WHERE name LIKE '%${name}%' AND type_id = ?`,
        type_id,
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            console.log(err.sqlMessage);
            reject(new Error(err.sqlMessage));
          }
        }
      );
    }),

  createBrand: (data) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        "INSERT INTO vehicle_brand SET ?",
        data,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: result.insertId,
              ...data,
            };
            resolve(newResult);
          } else {
            reject(new Error(error.sqlMessage));
          }
        }
      );
      console.log(query.sql);
    }),
  createType: (data) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        "INSERT INTO vehicle_type SET ?",
        data,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: result.insertId,
              ...data,
            };
            resolve(newResult);
          } else {
            reject(new Error(error.sqlMessage));
          }
        }
      );
      console.log(query.sql);
    }),
  createModel: (data) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        "INSERT INTO vehicle_model SET ?",
        data,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: result.insertId,
              ...data,
            };
            resolve(newResult);
          } else {
            reject(new Error(error.sqlMessage));
          }
        }
      );
      console.log(query.sql);
    }),
  createYear: (year) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        "INSERT INTO vehicle_year SET ?",
        year,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: result.insertId,
              ...year,
            };
            resolve(newResult);
          } else {
            console.log(error);
            reject(new Error(error.sqlMessage));
          }
        }
      );
      console.log(query.sql);
    }),
  createPrice: (data) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        "INSERT INTO pricelist SET ?",
        data,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: result.insertId,
              ...data,
            };
            resolve(newResult);
          } else {
            reject(new Error(error.sqlMessage));
          }
        }
      );
      console.log(query.sql);
    }),
  updateVehicle: (id, data) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        "UPDATE pricelist SET ? WHERE id = ?",
        [data, id],
        (error) => {
          if (!error) {
            const newResult = {
              id,
              ...data,
            };
            resolve(newResult);
          } else {
            reject(new Error(error.sqlMessage));
          }
        }
      );
      console.log(query.sql);
    }),

  deleteVehicle: (id) =>
    new Promise((resolve, reject) => {
      connection.query(`DELETE FROM pricelist WHERE ID = ?`, id, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          console.log(err.sqlMessage);
          reject(new Error(err.sqlMessage));
        }
      });
    }),
};
