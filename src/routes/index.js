const express = require("express");
const Router = express();

const authRoutes = require("../modules/auth/authRoutes");
const vehicleRoutes = require("../modules/vehicle/vehicleRoutes");

Router.use("/vehicle", vehicleRoutes);
Router.use("/auth", authRoutes);

module.exports = Router;
