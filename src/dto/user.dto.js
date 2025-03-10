import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

const { persistence } = argsUtil;

class UserDTO {
  constructor(data) {
    persistence !== "mongo" && (this._id = crypto.randomBytes(12).toString("hex"));
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.email = data.email;
    this.age = data.age;
    this.password = data.password;
    this.role = data.role || "USER";
    this.cart = data.cart || null;
    this.verifyUser = data.verifyUser || false;
    this.verifyCode = data.verifyCode || "";
    this.resetToken = data.resetToken || "";
    this.resetTokenExpires = data.resetTokenExpires || null;
    
    persistence !== "mongo" && (this.createdAt = new Date());
    persistence !== "mongo" && (this.updatedAt = new Date());
  }
}

export default UserDTO;