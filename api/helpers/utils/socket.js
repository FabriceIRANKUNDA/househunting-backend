import { promisify } from "util";
import jwt from "jsonwebtoken";

class WebSockets {
  constructor() {
    this.users = [];
  }

  connection = (client) => {
    // event fired when the chat room is disconnected
    client.on("disconnect", () => {
      this.users = this.users.filter((user) => user.socketId !== client.id);
    });
    // add identity of user mapped to the socket id
    client.on("identity", async (token) => {
      const user = await promisify(jwt.verify)(token, process.env.JWT_KEY);
      const alreadyConnectedUser = this.getUser(user._id);
      if (!alreadyConnectedUser) {
        this.users.push({
          socketId: client.id,
          userId: user._id,
        });
      }
      console.log("Connected", this.users);
    });
  };

  getUser = (userId) => {
    return this.users.filter((user) => user.userId == userId)[0];
  };

  removerUser = (userId) => {
    this.users = this.users.filter((user) => user.userId != userId);
  };
}

export default new WebSockets();
