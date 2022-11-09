import axios from "axios";
import qs from "qs";

class SendSMS {
  constructor(recepient, testCode, url) {
    this.to = recepient.phone;
    this.from = "Isuzume";
    this.firstName = recepient.firstName;
    this.url = url;
    this.testCode = testCode;
  }

  async send() {
    const message = `
        Byemejwe. ${this.firstName} kode yo gukoreraho: ${this.testCode} Sura www.isuzume.rw Murakoze.
      `;

    const data = qs.stringify({
      message,
      sender: this.from,
      recipients: this.to,
    });

    const config = {
      method: "post",
      url: this.url,
      headers: {
        Authorization: "Basic bXVuZXplbW15Om1lbW15MDcyMjQwNDUyOA==",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    try {
      const res = await axios(config);
      return res.data;
    } catch (error) {
      return error;
    }
  }

  async sendTestCodeSMS() {
    return await this.send();
  }
}

export default SendSMS;
