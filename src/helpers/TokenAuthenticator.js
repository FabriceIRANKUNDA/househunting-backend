import jwt from "jsonwebtoken";
import ShortUniqueId from "short-unique-id";

/**
 * @export
 * @class TokenAuthenticator
 */
export default class TokenAuthenticator {
  /**
   * Store data in Jwt
   * @static
   * @param {object} data data object
   * @memberof TokenAuthenticator
   * @returns {object} token
   */
  static tokenGenerator(data) {
    const token = jwt.sign(data, process.env.JWT_KEY);
    return token;
  }

  static OTPGenerator() {
    const OTP = new ShortUniqueId({
      length: 6,
      dictionary: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    })();
    const otpExpires = Date.now() + 10 * 60 * 1000;

    return { OTP, otpExpires };
  }
  /**
   * decode a JWT token
   * @static
   * @param {string} token signed token
   * @memberof TokenAuthenticator
   * @returns {object} payload
   */
  static decodeToken(token) {
    const payload = jwt.verify(token, process.env.JWT_KEY);
    return payload;
  }
  /**
   * Store data in Jwt
   * @static
   * @param {object} data data object
   * @memberof AuthenticateToken
   * @returns {object} signToken
   */
  static signToken(data) {
    const token = jwt.sign(data, process.env.JWT_KEY);
    return token;
  }
}
