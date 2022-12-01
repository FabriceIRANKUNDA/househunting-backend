import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

const { SENDGRID_SENDER } = process.env;

/**
 * @export
 * @class EmailTemplate
 */
class EmailTemplate {
  /**
   * register a new
   * @static
   * @param {Object} req request object
   * @param {Object} user user
   * @returns {Object} Verification Email template for consumers
   */
  static userVerificationEmail(req, user) {
    return {
      to: user.email,
      subject: "Verify email",
      from: SENDGRID_SENDER,
      html: `<div style="position: absolute; width: 100%; height: 100%; background-color: #f4f4f4;">
      <div style="display: flex; height: 120px; font-size: 25px;">
      <div>
      <h3 style="color: #FFAF00; margin-left: 20px; font-weight: 900;">House hunting group</h3>
      </div>
      </div>
      <div style="height: 60%; margin: auto; width: 94%; text-align: left; background-color: #ffff; -webkit-box-shadow: 5px 5px 5px 5px black; -moz-box-shadow: 5px 5px 5px 5px black; box-shadow: 5px 5px 5px 5px black;">
      <div style="height: 65%; padding: 10px;">
      <p>Hi ${user.names},</p>
      <p>House hunting group needs to verify your email address associated with the account created.</p>
      <p>To verify your email address, use the code below.</p>
      <p>This code expires in 10 minutes after the original verification request</p>
      <h1>${user.otp}</h1>
      </div>
      <div style="background-color: #f4f4f4; height: 25%; width: 100%; float: bottom; padding: 10px;">
      <p>If you have any issue, please reach out to us via our support email <a href="mailto:${SENDGRID_SENDER}" target="_self"> House hunting group</a></p>
      </div>
      </div>
      </div>`,
    };
  }
}

export default EmailTemplate;
