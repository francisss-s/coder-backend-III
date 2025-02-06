import { faker } from "@faker-js/faker";

export class MockUserDTO {
    constructor() {
      this.first_name = faker.person.firstName();  // ✅ Corregido
      this.last_name = faker.person.lastName();    // ✅ Corregido
      this.email = faker.internet.email();
      this.age = faker.number.int({ min: 18, max: 60 });  // ✅ Se agregó
      this.password = faker.internet.password();
      this.role = faker.helpers.arrayElement(["USER", "ADMIN"]); // ✅ Mayúsculas
    }
  }

  export class MockProductDTO {
    constructor() {
      this.title = faker.commerce.productName(); // ✅ Cambiado de `name` a `title`
      this.description = faker.commerce.productDescription();
      this.price = faker.commerce.price();
      this.stock = faker.number.int({ min: 1, max: 100 });
      this.category = faker.helpers.arrayElement(["celulares", "tablets", "computadoras"]); // ✅ Coincide con el esquema
    }
  }