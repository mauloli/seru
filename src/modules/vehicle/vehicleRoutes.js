const express = require("express");
const Router = express.Router();

const vehicleController = require("./vehicleController");
const middlewareAuth = require("../../middleware/auth");

Router.get("/", vehicleController.getAllVehicle);
Router.get("/:id", vehicleController.getVehicleById);

Router.post("/", middlewareAuth.isAdmin, vehicleController.createVehicle);
Router.post("/brand", middlewareAuth.isAdmin, vehicleController.createBrand);
Router.post("/type", middlewareAuth.isAdmin, vehicleController.createType);
Router.post("/model", middlewareAuth.isAdmin, vehicleController.createModel);
Router.post("/year", middlewareAuth.isAdmin, vehicleController.createYear);

Router.patch("/:id", middlewareAuth.isAdmin, vehicleController.updateVehicle);

Router.delete("/:id", middlewareAuth.isAdmin, vehicleController.deleteVehicle);

module.exports = Router;
