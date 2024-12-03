import Manager from "./manager.js";
import Product from "../models/product.model.js";

const productsManager = new Manager(Product)
const { create, read, update, destroy } = productsManager

export { create, read, update, destroy }