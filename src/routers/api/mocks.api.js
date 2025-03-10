import { generateAndSaveMocks, generateMockUsers } from "../../controllers/mocks.controller.js";

import CustomRouter from "../../utils/CustomRouter.util.js";

class MocksApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    
    this.read("/mockingusers", ["PUBLIC"], generateMockUsers);

   
    this.create("/mockingdata", ["PUBLIC"], generateAndSaveMocks);

  };
}

const mocksApiRouter = new MocksApiRouter();
export default mocksApiRouter.getRouter();
