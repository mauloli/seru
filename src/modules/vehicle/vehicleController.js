const helperWrapper = require("../../helper/wrapper");
const vehicleModel = require("./vehicleModel");

module.exports = {
  getAllVehicle: async (req, res) => {
    try {
      let { type_name, page, limit, brand_id, year_id } = req.query;
      page = Number(page);
      limit = Number(limit);
      const offset = page * limit - limit;
      let filter = "";
      if (!type_name) {
        type_name = "";
      }

      if (brand_id && year_id) {
        filter = `WHERE vt.name LIKE '%${type_name}%' AND vb.id = ${brand_id} AND vy.id=${year_id}`;
      } else if (year_id && !brand_id) {
        filter = `WHERE vt.name LIKE '%${type_name}%' AND vy.id = ${year_id}`;
      } else if (!year_id && brand_id) {
        filter = `WHERE vt.name LIKE '%${type_name}%' AND vb.id = ${brand_id}`;
      } else {
        filter = `WHERE vt.name LIKE '%${type_name}%'`;
      }

      const totalData = await vehicleModel.getCountVehicle(filter);
      const totalPage = Math.ceil(totalData / limit);

      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
      };

      const result = await vehicleModel.getAllVehicle(limit, offset, filter);
      return helperWrapper.response(
        res,
        200,
        "success get data",
        result,
        pageInfo
      );
    } catch (error) {
      console.log(error);
      return helperWrapper.response(res, 400, "bad request", null);
    }
  },
  getVehicleById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await vehicleModel.getVehicleById(id);
      return helperWrapper.response(res, 200, "success get brand", result);
    } catch (error) {
      console.log(error);
      return helperWrapper.response(res, 400, "bad request", null);
    }
  },
  getVehicleByModel: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await vehicleModel.getVehicleByModel(id);
      return helperWrapper.response(res, 200, "success get brand", result);
    } catch (error) {
      console.log(error);
      return helperWrapper.response(res, 400, "bad request", null);
    }
  },
  createBrand: async (req, res) => {
    try {
      const { name } = req.body;
      const checkBrand = await vehicleModel.getBrand(name);
      if (checkBrand.length > 0) {
        return helperWrapper.response(
          res,
          400,
          " brand has already added. add another brand",
          null
        );
      }
      const result = await vehicleModel.createBrand({ name: name });

      return helperWrapper.response(res, 200, "success add brand", result);
    } catch (error) {
      console.log(error);
      return helperWrapper.response(res, 400, "bad request", null);
    }
  },

  createType: async (req, res) => {
    try {
      let { name, brand_id } = req.body;
      brand_id = Number(brand_id);

      const setData = {
        name,
        brand_id,
      };
      const checkType = await vehicleModel.getType(name, brand_id);
      if (checkType.length > 0) {
        return helperWrapper.response(
          res,
          400,
          "type has already added. add another type",
          null
        );
      }
      const result = await vehicleModel.createType(setData);

      return helperWrapper.response(
        res,
        200,
        "success add vehicle type",
        result
      );
    } catch (error) {
      console.log(error);
      return helperWrapper.response(res, 400, "bad request", null);
    }
  },

  createModel: async (req, res) => {
    try {
      const { name, type_id } = req.body;
      const setData = {
        name,
        type_id,
      };

      const checkModel = await vehicleModel.getModel(name, type_id);
      if (checkModel.length > 0) {
        return helperWrapper.response(
          res,
          400,
          "model has alreaded added. add another model"
        );
      }
      const result = await vehicleModel.createModel(setData);

      return helperWrapper.response(
        res,
        200,
        "success add vehicle model",
        result
      );
    } catch (error) {
      console.log(error);
      return helperWrapper.response(res, 400, "bad request", null);
    }
  },
  createYear: async (req, res) => {
    try {
      const { year } = req.body;
      console.log(year);
      const setData = {
        year,
      };
      const checkYear = await vehicleModel.getYear(year);
      if (checkYear.length > 0) {
        return helperWrapper.response(
          res,
          400,
          "year has already added. add another year"
        );
      }
      const result = await vehicleModel.createYear(setData);

      return helperWrapper.response(
        res,
        200,
        "success add vehicle year",
        result
      );
    } catch (error) {
      console.log(error.response);
      return helperWrapper.response(res, 400, "bad request", null);
    }
  },

  createVehicle: async (req, res) => {
    //CREATE VEHICLE == CREATE PRICELIST
    try {
      const { code, price, year_id, model_id } = req.body;
      const checkCode = await vehicleModel.getVehicleByCode(code);
      if (checkCode.length > 0) {
        return helperWrapper.response(
          res,
          400,
          "code already registered, use other code ",
          null
        );
      }

      const setData = {
        code,
        price,
        year_id,
        model_id,
      };
      const result = await vehicleModel.createPrice(setData);

      return helperWrapper.response(
        res,
        200,
        "success add vehicle pricelist",
        result
      );
    } catch (error) {
      console.log(error);
    }
  },
  updateVehicle: async (req, res) => {
    try {
      const { id } = req.params;
      const { code, price, year_id, model_id } = req.body;
      const checkCode = await vehicleModel.getVehicleByCode(code);
      if (checkCode.length > 0) {
        return helperWrapper.response(
          res,
          400,
          "code already registered, use other code ",
          null
        );
      }
      const setData = {
        code,
        price,
        year_id,
        model_id,
        updatedAt: new Date(Date.now()),
      };
      const result = await vehicleModel.updateVehicle(id, setData);

      return helperWrapper.response(res, 200, "success update data", result);
    } catch (error) {
      console.log(error);
      return helperWrapper.response(res, 400, "bad request", null);
    }
  },
  deleteVehicle: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await vehicleModel.deleteVehicle(id);
      return helperWrapper.response(res, 200, "success delete vehicle");
    } catch (error) {
      console.log(error);
      return helperWrapper.response(res, 400, "bad request", null);
    }
  },
};
