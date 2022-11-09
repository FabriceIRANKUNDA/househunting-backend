import Response from "../helpers/Response";
import users from "../db/models/Users";
import HashPassword from "../helpers/HashPassword";
import HttpStatus from "http-status";

class DataChecker {
  static validateCredentials = async (req, res, next) => {
    const { email, password } = req.body;
    const result = await users.findOne({ email }).select("+password");

    if (!result) {
      return Response.errorMessage(
        res,
        "Account associated with this email does not exist. Kindly create one!",
        HttpStatus.UNAUTHORIZED
      );
    }

    const isPasswordMatch = HashPassword.matchingPassword(password, result);

    if (!isPasswordMatch) {
      return Response.errorMessage(
        res,
        "Email or password is incorrect",
        HttpStatus.UNAUTHORIZED
      );
    }

    req.result = result;
    next();
  };

  static istestCodeProvided(req, res, next) {
    const { testCode } = req.body;
    if (!testCode) {
      Response.errorMessage(res, "No test code provided", 400);
    } else {
      next();
    }
  }

  static isPhoneProvided(req, res, next) {
    const { phone } = req.query;
    if (!phone) {
      Response.errorMessage(res, "No phone number provided", 400);
    } else {
      next();
    }
  }
}

export default DataChecker;
