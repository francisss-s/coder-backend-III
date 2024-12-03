import Manager from "./manager.js";
import User from "../models/user.model.js";

const usersManager = new Manager(User)
const { create, read, readOne, update, destroy } = usersManager

export { create, read, readOne, update, destroy }