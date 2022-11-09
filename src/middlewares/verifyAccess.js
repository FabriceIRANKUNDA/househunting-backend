import Response from "../helpers/Response";
import httpStatus from "http-status";

const verifyAccess = function (requiredRole) {
  return async (req, res, next) => {
    try {
      const { role: userRole } = req.user;
      if (requiredRole !== userRole) {
        return Response.errorMessage(
          res,
          "Unauthorized! You don't have access to this resource. Please contact isuzume Admin if you think it's a mistake!",
          httpStatus.UNAUTHORIZED
        );
      }
      next();
    } catch (error) {
      Response.errorMessage(
        res,
        "Internal server error!",
        httpStatus.INTERNAL_SERVER_ERROR
      );
    }
  };
};
export default verifyAccess;
