import { Schema, model } from "mongoose";

const collection = "users"
const schema = new Schema({
    first_name: { type: String, required: true,},
    last_name: { type: String, required: true},
    email: { type: String, required: true, index: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true }, 
    role: { type: String, default: 'USER', enum: ['USER','ADMIN'] },
    cart: { type: Schema.Types.ObjectId, ref: 'cart' }
})

const User = model(collection, schema)
export default User