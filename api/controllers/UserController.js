import TokenAuthenticator from "../helpers/TokenAuthenticator";
import Response from "../helpers/Response";
import httpStatus from "http-status";
import catchAsyncErr from "../helpers/catchAsyncError";
import userService from "../services/UserService";
import AppError from "../helpers/appError";

class UserController {
  static getAllUsers = catchAsyncErr(async (req, res, next) => {
    const user = await userService.getAllUsers(req);
    if (!user)
      return next(new AppError(httpStatus.NOT_FOUND, "user not found"));
    return Response.successMessage(
      res,
      "we have got All user successfully!",
      user,
      httpStatus.OK
    );
  });

  static createUser = catchAsyncErr(async (req, res, next) => {
    const user = await userService.createUser(req);
    return Response.successMessage(
      res,
      "user created successfuly!",
      user,
      httpStatus.CREATED
    );
  });

  static getUser = catchAsyncErr(async (req, res, next) => {
    const user = await userService.getUser(req);
    if (!user)
      return next(new AppError(httpStatus.NOT_FOUND, "user not found"));
    return Response.successMessage(
      res,
      "user retrieved successfully!",
      user,
      httpStatus.OK
    );
  });

  static updateUser = catchAsyncErr(async (req, res, next) => {
    const userData = await userService.updateUser(req);
    if (!userData)
      return next(new AppError(httpStatus.NOT_FOUND, "user not found"));
    return Response.successMessage(
      res,
      "user updated successfully",
      userData,
      httpStatus.OK
    );
  });

  static deleteUser = catchAsyncErr(async (req, res, next) => {
    const userData = await userService.deleteUser(req);
    if (!userData)
      return next(new AppError(httpStatus.NOT_FOUND, "user not found"));
    return Response.successMessage(
      res,
      "user deleted successfully",
      null,
      httpStatus.OK
    );
  });

  static createPreferences = catchAsyncErr(async (req, res, next) => {
    const preferences = await userService.createPreferences(req);
    return Response.successMessage(
      res,
      "preferences created successfuly!",
      preferences,
      httpStatus.CREATED
    );
  });

  static updatePreferences = catchAsyncErr(async (req, res, next) => {
    console.log("........................");
    const data = await userService.updatePreferences(req);
    if (!data)
      return next(
        new AppError(
          httpStatus.NOT_FOUND,
          "No preferences associated with the current user, please register preferences first"
        )
      );
    return Response.successMessage(
      res,
      "preferences updated successfully",
      data,
      httpStatus.OK
    );
  });
}
export default UserController;
