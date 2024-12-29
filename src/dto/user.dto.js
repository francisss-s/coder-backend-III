import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

const { persistence } = argsUtil;

class UserDTO {
  constructor(data) {
    persistence !== "mongo" && (this._id = crypto.randomBytes(12).toString("hex"));
    this.isOnline = data.isOnline || false;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role || "USER";
    this.verifyUser = data.verifyUser || false;
    this.verifyCode = data.verifyCode || "1234";
    persistence !== "mongo" && (this.createdAt = new Date());
    persistence !== "mongo" && (this.updatedAt = new Date());
  }
}

export default UserDTO;