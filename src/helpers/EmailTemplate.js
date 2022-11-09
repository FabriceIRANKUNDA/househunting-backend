import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Email from "./Email";

dotenv.config();
const { EMAIL_ADDRESS, EMAIL_PASSWORD } = process.env;
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: "true",
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PASSWORD,
  },
});
/**
 * @export
 * @class EmailHelper
 */
class EmailHelper {
  /**
   * verify email
   * @static
   * @param {Object} req the template to use
   * @param {Object} user the template to use
   * @returns {Object} send Email to the buyer
   */
  static async verificationEmail(req, user) {
    const info = await transporter.sendMail(
      Email.userVerificationEmail(req, user)
    );
  }

  /**
   * new admin
   * @static
   * @param {Object} req the template to use
   * @param {Object} user the template to use
   * @returns {Object} send Email to the buyer
   */
  static async newUserEmail(req, user, password) {
    const info = await transporter.sendMail(
      req.body.role === "school"
        ? Email.newSchoolEmail(req, user, password)
        : Email.newAdminEmail(req, user, password)
    );
  }
}

export default EmailHelper;
