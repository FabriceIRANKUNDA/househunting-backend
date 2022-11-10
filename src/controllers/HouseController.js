import TokenAuthenticator from "../helpers//TokenAuthenticator";
import Response from "../helpers/Response";
import httpStatus from "http-status";
import catchAsyncErr from "../helpers/catchAsyncError";
import HouseService from "../services/HouseService";
import AppError from "../helpers/appError";

class HouseController {
  static getAllHouses = catchAsyncErr(async (req, res, next) => {
    const houses = await HouseService.getAllHouses(req);
    if (!houses)
      return next(new AppError(httpStatus.NOT_FOUND, "Houses not found"));
    return Response.successMessage(
      res,
      "we have got All houses successfully!",
      houses,
      httpStatus.OK
    );
  });

  static createHouse = catchAsyncErr(async (req, res, next) => {
    const houses = await HouseService.createHouse(req);

    return Response.successMessage(
      res,
      "House created successfuly!",
      houses,
      httpStatus.CREATED
    );
  });

  static getHouse = catchAsyncErr(async (req, res, next) => {
    const house = await HouseService.getHouse(req);
    if (!house)
      return next(new AppError(httpStatus.NOT_FOUND, "House not found"));
    return Response.successMessage(
      res,
      "house retrieved successfully!",
      house,
      httpStatus.OK
    );
  });

  static updateHouse = catchAsyncErr(async (req, res, next) => {
    const houseData = await HouseService.updateHouse(req);
    if (!houseData)
      return next(new AppError(httpStatus.NOT_FOUND, "House not found"));
    return Response.successMessage(
      res,
      "House updated successfully",
      houseData,
      httpStatus.OK
    );
  });

  static deleteHouse = catchAsyncErr(async (req, res, next) => {
    const houseData = await HouseService.deleteHouse(req);
    if (!houseData)
      return next(new AppError(httpStatus.NOT_FOUND, "House not found"));
    return Response.successMessage(
      res,
      "House deleted successfully",
      null,
      httpStatus.OK
    );
  });
}
export default HouseController;
