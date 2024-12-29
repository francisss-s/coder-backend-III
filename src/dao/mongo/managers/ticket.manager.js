import Manager from "./manager.js";
import TicketModel from "../models/ticket.model.js";

const ticketsManager = new Manager(TicketModel)
export default ticketsManager