import { MockProductDTO, MockUserDTO } from "../dto/mocks.dto.js";

import { MocksManager } from "../dao/mongo/managers/mocks.manager.js";

const mocksManager = new MocksManager();

export class MocksService {
  generateUsers(count) {
    return Array.from({ length: count }, () => new MockUserDTO());
  }

  generateProducts(count) {
    return Array.from({ length: count }, () => new MockProductDTO());
  }

  async saveUsers(users) {
    return await mocksManager.insertUsers(users);
  }

  async saveProducts(products) {
    return await mocksManager.insertProducts(products);
  }
}
