import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

const { persistence } = argsUtil;

class CartDto {
  constructor(data) {
    persistence !== "mongo" && (this._id = crypto.randomBytes(12).toString("hex"));
    this.user_id = data.user_id;
    this.products = data.products || [];
    this.status = data.status || "active"; // Corregido de 'state' a 'status'
    persistence !== "mongo" && (this.createdAt = new Date());
    persistence !== "mongo" && (this.updatedAt = new Date());
  }
}


export default CartDto;