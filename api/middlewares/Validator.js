import { check, query, validationResult } from "express-validator";
import Response from "../helpers/Response";
// import moment from 'moment';

/**
 * @export
 * @class Validator
 */
class Validator {
  /**
   * Validate input
   * @static
   * @returns {object} error description OR return next middleware
   */
  static validateInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors.errors.map((err) => err.msg);
      return Response.errorMessage(res, errorMessage, 400);
    }
    return next();
  };
  /**
   * Validate new account input
   * @static
   * @returns {object} errors
   */
  static newAccountRules() {
    return [
      check("firstName", "first name should be valid").trim().isAlpha(),
      check("lastName", "last name should be valid").trim(),
      check("email", "email should be valid").trim().isEmail(),
      check("phone", "phone should be valid").trim().isNumeric(),
      check(
        "password",
        "A valid password should have a character, number, UPPER CASE letter and a lower case letter and should be longer than 8"
      )
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
        .custom((value, { req, loc, path }) => {
          if (value !== req.body.confirmPassword) {
            throw new Error("Passwords don't match");
          } else {
            return next();
          }
        }),
    ];
  }
  /**
   * Validate new account input
   * @static
   * @returns {object} errors
   */
  static updatePasswordRules() {
    return [
      check(
        "password",
        "A valid password should have a character, number, UPPER CASE letter and a lower case letter and should be longer than 8"
      )
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
        .custom((value, { req, loc, path }) => {
          if (value !== req.body.confirmPassword) {
            throw new Error("Passwords don't match");
          } else {
            return next();
          }
        }),
    ];
  }

  /**
   * Validate login input
   * @static
   * @returns {object} errors
   */
  static loginRules() {
    return [
      check("email", "email should be valid").trim().isEmail(),
      check("password", "Password should be valid").isString(),
    ];
  }

  /**
   * Validate module id
   * @static
   * @returns {object} errors
   */
  static moduleRules() {
    return [check("moduleName", "Module name should be valid").isInt()];
  }

  /**
   * Validate role
   * @static
   * @returns {object} errors
   */
  static roleRules() {
    return [
      check("role", "Role should be admin, student, school or agent").isIn([
        "admin",
        "student",
        "school",
        "agent",
      ]),
    ];
  }

  /**
   * Validate module id
   * @static
   * @returns {object} errors
   */
  static userIdRules() {
    return [check("user", "User Id should be valid").isString()];
  }

  /**
   * Validate email address
   * @static
   * @returns {object} errors
   */
  static invitationRules() {
    return [
      check("firstName", "first name should be valid").isAlpha(),
      check("lastName", "last name should be valid").trim(),
      check("email", "email should be valid").trim().isEmail(),
      check("phone", "phone is required please try again").trim().isNumeric(),
      check("role", "role should be either school, agent or admin").isIn([
        "school",
        "agent",
        "admin",
      ]),
    ];
  }
}

export default Validator;
