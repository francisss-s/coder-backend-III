import Manager from "./manager.js";
import User from "../models/user.model.js";

const usersManager = new Manager(User)
export default usersManager