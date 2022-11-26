import EmailTemplate from "./EmailTemplate";
import sendGrid from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

const { SENDGRID_API_KEY } = process.env;
sendGrid.setApiKey(SENDGRID_API_KEY);
/**
 * @export
 * @class Email
 */
class Email {
  /**
   * verify email
   * @static
   * @param {Object} req the template to use
   * @param {Object} user the template to use
   * @returns {Object} send Email to the buyer
   */

  static async verificationEmail(req, user) {
    const msg = EmailTemplate.userVerificationEmail(req, user);
    await sendGrid.send(msg);
  }
}

export default Email;
