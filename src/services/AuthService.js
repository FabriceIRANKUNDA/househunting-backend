import users from "../db/models/Users";
import HashPassword from "../helpers/HashPassword";
import TokenAuthenticator from "../helpers//TokenAuthenticator";

class AuthService {
  /**
   * User new account creation method
   * @static
   * @param {object} req  request object
   * @memberof AuthService
   * @returns {object} data
   */
  static async userSignup(req) {
    const { firstName, lastName, email, phone, password } = req.body;
    const hashedPassword = HashPassword.hashPassword(password);
    const newUserObject = {
      // id: uuid(),
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      role: "user",
      isVerified: false,
      isActive: true,
    };

    const newUser = await users.create(newUserObject);
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
    // const updateRoleObj = [{ role }, { where: { id: user } }];
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
  static async verifyUser(req) {
    const { user, isVerified } = req.body;
    // const updateRoleObj = [{ role }, { where: { id: user } }];
    const newUser = await users.findOneAndUpdate(
      { _id: user },
      { isVerified: isVerified },
      { runValidators: true }
    );
    return newUser;
  }

  /**
   * Admin add other admins
   * @static
   * @param {object} req  request object
   * @memberof AuthService
   * @returns {object} data
   */
  static async inviteUser(req) {
    const { email, firstName, lastName, phone, password, role } = req.body;
    const hashedPassword = HashPassword.hashPassword(password);
    const newUserObject = {
      // id: uuid(),
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      role,
      is_verified: true,
      is_active: true,
    };
    const newUser = await users.create(newUserObject);
    return newUser;
  }

  /**
   * Admin view users
   * @static
   * @param {object} req  request object
   * @memberof AuthService
   * @returns {object} data
   */
  static async viewUsers(req) {
    const allUsers = await users.find();
    return allUsers;
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
}
export default AuthService;
