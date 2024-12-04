import { Schema, model } from "mongoose";

import bcrypt from 'bcrypt';

const collection = "users";

const schema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    cart: { type: Schema.Types.ObjectId, ref: 'Cart' },
    role: { type: String, default: 'user', enum: ['user', 'admin'] }
});

// Encriptar la contraseña antes de guardar
schema.pre('save', function(next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
    }
    next();
});

const User = model(collection, schema);
export default User;
