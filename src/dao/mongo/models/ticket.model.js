import { Schema, model } from 'mongoose';

import { v4 as uuidv4 } from 'uuid';

const collection = 'tickets';
const ticketSchema = new Schema({
  code: {
    type: String,
    unique: true,
    default: () => uuidv4().substring(0, 8)  // Ej: "a1b2c3d4"
  },
  purchase_datetime: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true
  },
  purchaser: {
    type: String, // Guardaremos el email del usuario
    required: true
  }
});

const TicketModel = model(collection, ticketSchema);
export default TicketModel;
