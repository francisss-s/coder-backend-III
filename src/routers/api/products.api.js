import {
  createProduct,
  destroyProduct,
  readProducts,
  updateProduct,
} from "../../controllers/products.controller.js";

import CustomRouter from "../../utils/CustomRouter.util.js";
import passportCb from "../../middlewares/passportCb.mid.js";

class ProductsApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    
    this.create("/", ["PUBLIC"], createProduct);

    this.read("/", ["PUBLIC"], readProducts);

    this.update("/:id", ["ADMIN"], passportCb("admin"), updateProduct);

    this.destroy("/:id", ["ADMIN"], passportCb("admin"), destroyProduct);
  };
}

const productsApiRouter = new ProductsApiRouter();
export default productsApiRouter.getRouter();
