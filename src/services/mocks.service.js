import { MockProductDTO, MockUserDTO } from "../dto/mocks.dto.js";

import { MocksManager } from "../dao/mongo/managers/mocks.manager.js";

const mocksManager = new MocksManager();

export class MocksService {
  generateUsers(count) {
    if (!count || isNaN(count) || count <= 0) {
      count = 10; // Valor por defecto
    }
    return Array.from({ length: count }, () => new MockUserDTO());
  }

  generateProducts(count) {
    if (!count || isNaN(count) || count <= 0) {
      count = 10; // Valor por defecto
    }
    return Array.from({ length: count }, () => new MockProductDTO());
  }

  async saveUsers(users) {
    return await mocksManager.insertUsers(users);
  }

  async saveProducts(products) {
    return await mocksManager.insertProducts(products);
  }
}
