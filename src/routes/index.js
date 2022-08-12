const express = require("express");
const Router = express();

const authRoutes = require("../modules/auth/authRoutes");
const vehicleRoutes = require("../modules/vehicle/vehicleRoutes");
const middlewareAuth = require("../middleware/auth");

Router.use("/vehicle", middlewareAuth.authentication, vehicleRoutes);
Router.use("/auth", authRoutes);

module.exports = Router;
