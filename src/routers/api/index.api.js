import CustomRouter from "../../utils/CustomRouter.util.js";
import users from "./users.api.js";

class ApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.use("/users", ["PUBLIC"], users);
  };
}

const apiRouter = new ApiRouter();
export default apiRouter.getRouter();