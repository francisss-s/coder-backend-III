import { createUser, destroyUser, readUsers, updateUser } from "../../controllers/user.controller.js"

import CustomRouter from "../../utils/CustomRouter.util.js";

class UsersApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["ADMIN"], createUser);
    this.read("/", ["ADMIN"], readUsers);
    this.update("/:id", ["USER", "ADMIN"], updateUser);
    this.destroy("/:id", ["USER", "ADMIN"], destroyUser);
  };
}

const usersApiRouter = new UsersApiRouter();
export default usersApiRouter.getRouter();