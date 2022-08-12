const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const helperWrapper = require("../../helper/wrapper");
const authModel = require("./authModel");

module.exports = {
  register: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const passwordHash = await bcrypt.hash(password, 10);
      const checkUser = await authModel.getUserByEmail(email);
      if (checkUser.length > 0) {
        return helperWrapper.response(res, 400, "email sudah terdaftar", null);
      }
      const setData = {
        firstName,
        lastName,
        email,
        password: passwordHash,
      };
      const result = await authModel.register(setData);
      return helperWrapper.response(res, 200, "success register user", result);
    } catch (error) {
      console.log(error);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const checkUser = await authModel.getUserByEmail(email);
      if (checkUser.length < 1) {
        return helperWrapper.response(res, 400, "email belum terdaftar", null);
      }
      const resultCompare = await bcrypt.compare(
        password,
        checkUser[0].password
      );
      if (!resultCompare) {
        return helperWrapper.response(res, 400, "wrong password", null);
      }
      const payload = checkUser[0];
      delete payload.password;

      const token = jwt.sign({ ...payload }, "RAHASIA", { expiresIn: "1h" });

      return helperWrapper.response(res, 200, "succes login", {
        id: payload.id,
        token,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
