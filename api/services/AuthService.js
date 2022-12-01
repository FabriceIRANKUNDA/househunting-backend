import users from "../db/models/Users";
import HashPassword from "../helpers/HashPassword";
import TokenAuthenticator from "../helpers/TokenAuthenticator";
import AppError from "../helpers/appError";
import User from "../db/models/Users";
import Email from "../helpers/Email";

class AuthService {
  /**
   * User new account creation method
   * @static
   * @param {object} req  request object
   * @memberof AuthService
   * @returns {object} data
   */
  static async userSignup(req) {
    const { names, email, phone, password } = req.body;
    const hashedPassword = HashPassword.hashPassword(password);
    const { OTP, otpExpires } = TokenAuthenticator.OTPGenerator();
    const newUserObject = {
      names,
      email,
      phone,
      password: hashedPassword,
      isVerified: false,
      isActive: true,
      otp: OTP,
      otpExpires,
    };

    const newUser = await users.create(newUserObject);
    return newUser;
  }

  static async resendOTP(req) {
    const { user } = req;
    const { OTP, otpExpires } = TokenAuthenticator.OTPGenerator();

    const newUser = await users.findById(user._id);
    if (!newUser) return false;

    newUser.otp = OTP;
    newUser.otpExpires = otpExpires;
    await newUser.save({ validateBeforeSave: false });

    Email.verificationEmail(req, newUser);

    return newUser;
  }

  /**
   * Admin assign roles
   * @static
   * @param {object} req  request object
   * @memberof AuthService
   * @returns {object} data
   */
  static async assignRole(req) {
    const { user, role } = req.body;
    // const updateRoleObj = [{ role }, { where: { id: user } }];
    const newUser = await users.findOneAndUpdate(
      { _id: user },
      { role: role },
      { runValidators: true }
    );
    return newUser;
  }

  /**
   * Admin activate users
   * @static
   * @param {object} req  request object
   * @memberof AuthService
   * @returns {object} data
   */
  static async activateUser(req) {
    const { user, isActive } = req.body;
    const newUser = await users.findOneAndUpdate(
      { _id: user },
      { isActive: isActive },
      { runValidators: true }
    );
    return newUser;
  }

  /**
   * Admin verify Users
   * @static
   * @param {object} req  request object
   * @memberof AuthService
   * @returns {object} data
   */
  static async verifyUser(req, next) {
    const { otp } = req.body;
    const { user } = req;

    const newUser = await users.findOne({
      _id: user._id,
      otp,
      otpExpires: { $gt: Date.now() },
    });

    if (!newUser) return false;

    newUser.isVerified = true;
    newUser.otp = undefined;
    newUser.otpExpires = undefined;
    await newUser.save({ validateBeforeSave: false });

    return true;
  }

  /**
   * User update profile
   * @static
   * @param {object} req  request object
   * @memberof AuthService
   * @returns {object} data
   */
  static async updateProfile(req) {
    const { firstName, lastName, email, password } = req.body;
    const { _id } = req.user;
    let userProfile;
    if (password) {
      const hashedPassword = HashPassword.hashPassword(password);
      userProfile = await users.findOneAndUpdate(
        { _id: _id },
        { password: hashedPassword },
        { runValidators: true }
      );
    } else {
      userProfile = await users.findOneAndUpdate({ _id: _id }, req.body, {
        runValidators: true,
      });
    }
    const { password: newPassword, ...userData } = userProfile;
    userData._doc.password = "";
    // console.log(userData._doc)
    const token = TokenAuthenticator.tokenGenerator(userData._doc);

    return token;
  }

  static login = async (req, next) => {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new AppError(400, "Please provide email and password"));

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(
        new AppError(
          404,
          "Please make sure you have an account!, Go ahead to /signup"
        )
      );
    }

    if (!(await user.isCorrectPassword(password, user.password)))
      return next(new AppError(401, "Incorrect email or Password"));
    else return user;
  };
}
export default AuthService;
