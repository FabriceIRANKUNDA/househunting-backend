import TokenAuthenticator from "./TokenAuthenticator";

const { EMAIL_ADDRESS, WEB_BASE_URL, BASE_URL_PATH } = process.env;

/**
 * @export
 * @class Email
 */
class Email {
  /**
   * register a new
   * @static
   * @param {Object} req request object
   * @param {Object} user user
   * @returns {Object} Verification Email template for consumers
   */
  static userVerificationEmail(req, user) {
    const token = TokenAuthenticator.tokenGenerator(user);
    return {
      to: user.email,
      subject: "Verify email",
      html: `<div style="position: absolute; width: 100%; height: 100%; background-color: #f4f4f4;">
      <div style="display: flex; height: 120px; font-size: 25px;">
      <div>
      <h3 style="color: #FFAF00; margin-left: 20px; font-weight: 900;">SheCanCode Materials</h3>
      </div>
      </div>
      <div style="height: 60%; margin: auto; width: 94%; text-align: left; background-color: #ffff; -webkit-box-shadow: 5px 5px 5px 5px black; -moz-box-shadow: 5px 5px 5px 5px black; box-shadow: 5px 5px 5px 5px black;">
      <div style="height: 65%; padding: 10px;">
      <p>Hi ${user.firstName} ${user.lastName},</p>
      <p>SheCanCode Materials needs to verify your email address associated with the account created.</p>
      <p>To verify your email address, click on the link below.</p>
      <a style="display: block; background-color: #FFAF00; width: 200px; text-align: center; height: auto; text-decoration: none; color: #ffff; padding: 5px;" href="${BASE_URL_PATH}/auth/verify-account?token=${token}" target="_blank" rel="noopener"> Verify Email</a>
      <p>This link expires in 24 hours after the original verification request</p>
      <p>Click<a style="display: block; color: #FFAF00; text-decoration: none;" href="${BASE_URL_PATH}/auth/verify-account?token=${token}" target="_blank" rel="noopener"> here </a> to request an email resend</p>
      </div>
      <div style="background-color: #f4f4f4; height: 25%; width: 100%; float: bottom; padding: 10px;">
      <p>If you have any issue, please reach out to us via our support email <a href="mailto:${EMAIL_ADDRESS}" target="_self"> SheCanCode Materials</a></p>
      </div>
      </div>
      </div>`,
    };
  }

  /**
   * register a new admin
   * @static
   * @param {Object} req request object
   * @param {Object} user user
   * @returns {Object} Verification Email template for consumers
   */
  static newAdminEmail(req, user, password) {
    const token = TokenAuthenticator.tokenGenerator(user);
    return {
      to: user.email,
      subject: "Invitiation to collaborate",
      html: `<div style="position: absolute; width: 100%; height: 100%; background-color: #f4f4f4;">
      <div style="display: flex; height: 120px; font-size: 25px;">
      <div>
      <h3 style="color: #1890ff; margin-left: 20px; font-weight: 900;">SheCanCode Materials</h3>
      </div>
      </div>
      <div style="height: 60%; margin: auto; width: 94%; text-align: left; background-color: #ffff; -webkit-box-shadow: 5px 5px 5px 5px black; -moz-box-shadow: 5px 5px 5px 5px black; box-shadow: 5px 5px 5px 5px black;">
      <div style="height: 65%; padding: 10px;">
      <p>Hello <strong>${user.firstName} ${user.lastName}</strong>,</p>
      <p>SheCanCode Admin has invited you to collaborate on ShaCanCode materials. Use the following credentials:</p>
      <p><strong>Email</strong>: ${user.email}</p>
      <p><strong>Password</strong>: ${password}</p>
      <p>&nbsp;</p>
      <p>To start collaborating, click on the below button:</p>
      <a style="display: block; background-color: #1890ff; width: 200px; text-align: center; height: auto; text-decoration: none; color: #ffff; padding: 5px;" href="${WEB_BASE_URL}/auth/login" target="_blank" rel="noopener"> Accept invitation</a>
      <p>This link expires 24 hours after the original invitation request.</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      </div>
      <div style="background-color: #f4f4f4; height: 25%; width: 100%; float: bottom; padding: 10px;">
      <p>&nbsp;</p>
      </div>
      </div>
      </div>
      `,
    };
  }

  /**
   * register a new student
   * @static
   * @param {Object} req request object
   * @param {Object} user user
   * @returns {Object} Verification Email template for consumers
   */
  static newSchoolEmail(req, user, password) {
    const token = TokenAuthenticator.tokenGenerator(user);
    return {
      to: user.email,
      subject: "SheCanCode Materials",
      html: `<div style="position: absolute; width: 100%; height: 100%; background-color: #f4f4f4;">
      <div style="display: flex; height: 120px; font-size: 25px;">
      <div>
      <h3 style="color: #1890ff; margin-left: 20px; font-weight: 900;">SheCanCode Materials</h3>
      </div>
      </div>
      <div style="height: 60%; margin: auto; width: 94%; text-align: left; background-color: #ffff; -webkit-box-shadow: 5px 5px 5px 5px black; -moz-box-shadow: 5px 5px 5px 5px black; box-shadow: 5px 5px 5px 5px black;">
      <div style="height: 65%; padding: 10px;">
      <p>Hello <strong>${user.firstName} ${user.lastName}</strong>,</p>
      <p>You have been invited on ShaCanCode study materials. Use the following credentials:</p>
      <p><strong>Email</strong>: ${user.email}</p>
      <p><strong>Password</strong>: ${password}</p>
      <p>&nbsp;</p>
      <p>To start accessing materials, click on the below button:</p>
      <a style="display: block; background-color: #1890ff; width: 200px; text-align: center; height: auto; text-decoration: none; color: #ffff; padding: 5px;" href="${WEB_BASE_URL}/auth/login" target="_blank" rel="noopener"> Accept invitation</a>
      <p>This link expires 24 hours after the original invitation request.</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      </div>
      <div style="background-color: #f4f4f4; height: 25%; width: 100%; float: bottom; padding: 10px;">
      <p>&nbsp;</p>
      </div>
      </div>
      </div>
      `,
    };
  }
}

export default Email;
