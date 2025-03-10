import { createRepository, destroyRepository, readOneProduct, readRepository, updateRepository } from "../repository/products.repository.js";

class ProductsService {
  createService = async (data) => await createRepository(data);
  readServiceAll = async () => await readRepository();
  readService = async (id) => await readOneProduct(id);
  updateService = async (id, data) => await updateRepository(id, data);
  destroyService = async (id) => await destroyRepository(id);
}

const service = new ProductsService();
const { createService, readServiceAll, updateService, destroyService,readService } = service;
export { createService, readServiceAll, updateService, destroyService,readService }