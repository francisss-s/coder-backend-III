import {
  createCart,
  destroyCart,
  purchaseCart,
  readCartsFromUser,
  updateCart
} from "../../controllers/carts.controller.js";

import CustomRouter from "../../utils/CustomRouter.util.js";

class CartsApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }

  init = () => {

    this.create("/", ["USER"], createCart);

    this.read("/:user_id", ["USER", "ADMIN"], readCartsFromUser);

    this.update("/:id", ["USER", "ADMIN"], updateCart);

    this.destroy("/:id", ["USER", "ADMIN"], destroyCart);

    this.create("/:cid/purchase", ["USER"], purchaseCart);
  };
}

const cartsApiRouter = new CartsApiRouter();
export default cartsApiRouter.getRouter();
