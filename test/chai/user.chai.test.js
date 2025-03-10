import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../index.js";

chai.use(chaiHttp);
const { expect } = chai;

describe("🧪 Chai - User API Tests", () => {
  let token = "";

  it("✅ Debería registrar un usuario correctamente", async () => {
    const res = await chai
      .request(server)
      .post("/api/users/register")
      .send({
        first_name: "Test",
        last_name: "User",
        email: `test${Date.now()}@email.com`,
        age: 25,
        password: "password123",
        role: "USER",
      });
    
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("message", "User registered and logged in successfully!");
  });

  it("✅ Debería fallar si no se envían datos en el registro", async () => {
    const res = await chai.request(app).post("/api/users/register").send({});
    expect(res.status).to.equal(400);
  });
});
