import ProductModel from "../models/product.model.js";
import UserModel from "../models/user.model.js";

export class MocksManager {
  async insertUsers(users) {
    try {
      return await UserModel.insertMany(users);
    } catch (error) {
      console.error("Error inserting mock users:", error);
      throw new Error("Database error inserting mock users.");
    }
  }

  async insertProducts(products) {
    try {
      return await ProductModel.insertMany(products);
    } catch (error) {
      console.error("Error inserting mock products:", error);
      throw new Error("Database error inserting mock products.");
    }
  }
}
