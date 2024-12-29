import {
  createProduct,
  destroyProduct,
  readProducts,
  updateProduct,
} from "../../controllers/products.controller.js";

import CustomRouter from "../../utils/CustomRouter.util.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import verifyToken from "../../middlewares/verifyToken.mid.js";

class ProductsApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["PUBLIC"], createProduct);
    //this.create("/", ["ADMIN"], createProduct);
    this.read("/", ["PUBLIC"], readProducts);
    this.update("/:id", ["ADMIN"], passportCb("admin"), updateProduct);
    this.destroy("/:id", ["ADMIN"], passportCb("admin"), destroyProduct);
  };
}

const productsApiRouter = new ProductsApiRouter();
export default productsApiRouter.getRouter();