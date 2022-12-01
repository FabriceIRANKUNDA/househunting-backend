import TokenAuthenticator from "../helpers/TokenAuthenticator";
import Response from "../helpers/Response";
import httpStatus from "http-status";
import AuthService from "../services/AuthService";
import Email from "../helpers/Email";
import passwordGenerator from "generate-password";
import catchAsyncError from "../helpers/catchAsyncError";
import AppError from "../helpers/appError";

class AuthController {
  static signup = catchAsyncError(async (req, res, next) => {
    const newUser = await AuthService.userSignup(req);
    newUser.password = "";
    const { password, ...data } = newUser;
    const token = TokenAuthenticator.tokenGenerator(data._doc);
    data.token = token;

    const response = await Email.verificationEmail(req, data._doc);

    Response.successMessage(
      res,
      "Account created successfully! Please proceed to the next step of verifying your new account!",
      { token },
      httpStatus.CREATED
    );
  });

  static verifyEmail = catchAsyncError(async (req, res, next) => {
    const verified = await AuthService.verifyUser(req);

    if (!verified) {
      return next(
        new AppError(httpStatus.BAD_REQUEST, "Invalid code or has expired!.")
      );
    }
    return Response.successMessage(
      res,
      "Email verified successfuly!",
      null,
      httpStatus.OK
    );
  });

  static resendOTP = catchAsyncError(async (req, res, next) => {
    const sent = await AuthService.resendOTP(req);

    if (!sent) {
      return next(
        new AppError(httpStatus.BAD_REQUEST, "Sending new OTP failed!.")
      );
    }
    return Response.successMessage(
      res,
      "Email sent successfuly!",
      null,
      httpStatus.OK
    );
  });

  static login = catchAsyncError(async (req, res, next) => {
    const result = await AuthService.login(req, next);
    result.password = undefined;
    const { password, ...data } = result;

    if (result) {
      const token = TokenAuthenticator.signToken(data._doc);
      return Response.successMessage(
        res,
        "Logged in successfully",
        { token },
        httpStatus.OK
      );
    }
  });

  static async assignRole(req, res) {
    await AuthService.assignRole(req);

    return Response.successMessage(
      res,
      "Role assigned successfully",
      "",
      httpStatus.OK
    );
  }
  static async activateUser(req, res) {
    await AuthService.activateUser(req);

    return Response.successMessage(
      res,
      "User activated successfully",
      "",
      httpStatus.OK
    );
  }
  static async verifyUser(req, res) {
    await AuthService.verifyUser(req);

    return Response.successMessage(
      res,
      "User verified successfully",
      "",
      httpStatus.OK
    );
  }

  static async inviteUser(req, res) {
    const newPassword = passwordGenerator.generate({
      length: 10,
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
    });
    req.body.password = newPassword;
    const newUser = await AuthService.inviteUser(req);
    const { password, ...data } = newUser;
    data._doc.password = "";
    const token = TokenAuthenticator.tokenGenerator(data._doc);
    data.token = token;

    //Victor

    await EmailTemplate.newUserEmail(req, data._doc, newPassword);

    return Response.successMessage(
      res,
      "Invitation has been sent successfully!",
      data._doc,
      httpStatus.CREATED
    );
  }

  static async viewUsers(req, res) {
    const users = await AuthService.viewUsers(req);

    return Response.successMessage(
      res,
      "we have got All users successfully!",
      users,
      httpStatus.CREATED
    );
  }

  static async updateProfile(req, res) {
    const profileData = await AuthService.updateProfile(req);
    return Response.successMessage(
      res,
      "Profile updated successfully",
      profileData,
      httpStatus.OK
    );
  }
}
export default AuthController;
