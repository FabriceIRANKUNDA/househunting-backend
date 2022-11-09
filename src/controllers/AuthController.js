import TokenAuthenticator from "../helpers//TokenAuthenticator";
import Response from "../helpers/Response";
import httpStatus from "http-status";
import AuthService from "../services/AuthService";
import EmailTemplate from "../helpers/EmailTemplate";
import passwordGenerator from 'generate-password';

class AuthController {

  static async signup(req, res) {
    const newUser = await AuthService.userSignup(req);
    newUser.password='';
    const { password, ...data } = newUser;
    const token = TokenAuthenticator.tokenGenerator(data._doc);
    data.token = token;
// fix this email issues victor
    EmailTemplate.verificationEmail(req, data._doc);

    Response.successMessage(
      res,
      "Account created successfully! Please proceed to the next step of verifying your new account!",
      { token },
      httpStatus.CREATED
    );
  }

  static async login(req, res) {
    const { result } = req;

    result.password="";
    const { password: pwd, ...data } = result;
    const token = TokenAuthenticator.signToken(data._doc);
    return Response.successMessage(
      res,
      "Logged in successfully",
      { token },
      httpStatus.OK
    );
  }

  static async assignRole(req, res) {
    await AuthService.assignRole(req);

    return Response.successMessage(
      res,
      "Role assigned successfully",
      '',
      httpStatus.OK
    );
  }
  static async activateUser(req, res) {
    await AuthService.activateUser(req);

    return Response.successMessage(
      res,
      "User activated successfully",
      '',
      httpStatus.OK
    );
  }
  static async verifyUser(req, res) {
    await AuthService.verifyUser(req);

    return Response.successMessage(
      res,
      "User verified successfully",
      '',
      httpStatus.OK
    );
  }

  static async inviteUser(req, res) {
    const newPassword =  passwordGenerator.generate({length: 10, uppercase: true, lowercase:true, numbers: true, symbols: true})
    req.body.password = newPassword;
    const newUser = await AuthService.inviteUser(req);
    const { password, ...data } = newUser;
    data._doc.password="";
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
