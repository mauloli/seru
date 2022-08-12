const helperWrapper = require("../../helper/wrapper");
const vehicleModel = require("./vehicleModel");

module.exports = {
  getAllVehicle: async (req, res) => {
    try {
      let { type_id, page, limit, model_id, brand_id } = req.query;
      page = Number(page);
      limit = Number(limit);
      type_id = Number(type_id);
      const offset = page * limit - limit;
      const totalData = await vehicleModel.getCountVehicle(type_id);
      const totalPage = Math.ceil(totalData / limit);

      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
      };

      const result = await vehicleModel.getAllVehicle(
        limit,
        offset,
        type_id,
        1,
        1
      );
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
  createBrand: async (req, res) => {
    try {
      const { name } = req.body;
      const result = await vehicleModel.createBrand({ name: name });

      return helperWrapper.response(res, 200, "success add brand", result);
    } catch (error) {
      console.log(error);
      return helperWrapper.response(res, 400, "bad request", null);
    }
  },

  createType: async (req, res) => {
    try {
      const { name, brand_id } = req.body;
      const setData = {
        name,
        brand_id,
      };
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
