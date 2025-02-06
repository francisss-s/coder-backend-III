import ProductModel from "../models/product.model.js";
import UserModel from "../models/user.model.js";

export class MocksManager {
  async insertUsers(users) {
    return await UserModel.insertMany(users);
  }

  async insertProducts(products) {
    return await ProductModel.insertMany(products);
  }
}
