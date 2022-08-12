const express = require("express");
const Router = express.Router();

const vehicleController = require("./vehicleController");

Router.get("/", vehicleController.getAllVehicle);

Router.post("/", vehicleController.createVehicle);
Router.post("/brand", vehicleController.createBrand);
Router.post("/type", vehicleController.createType);
Router.post("/model", vehicleController.createModel);
Router.post("/year", vehicleController.createYear);
Router.patch("/:id", vehicleController.updateVehicle);
Router.delete("/:id", vehicleController.deleteVehicle);
module.exports = Router;
