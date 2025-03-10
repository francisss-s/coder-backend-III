import { Schema, Types, model } from "mongoose";

const collection = "carts";
const schema = new Schema({
  user_id: { type: Types.ObjectId, ref: "users", required: true },
  products: [
    {
      product_id: { type: Types.ObjectId, ref: "products", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  status: { type: String, enum: ["active", "purchased"], default: "active" },
});

const Cart = model(collection, schema);
export default Cart;
