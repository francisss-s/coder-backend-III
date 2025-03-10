import { expect } from "chai";
import server from "../../index.js";
import supertest from "supertest";

const request = supertest(server);

describe("🧪 Supertest - User API Tests", () => {
  let token = "";
  let userId = "";
  let verificationCode = "";
  let resetToken = "";
  const testEmail = `test${Date.now()}@email.com`;
  const testPassword = "password123";

  it("✅ Debería registrar un usuario correctamente", async () => {
    const res = await request.post("/api/users/register").send({
      first_name: "Test",
      last_name: "User",
      email: testEmail,
      age: 25,
      password: testPassword,
      role: "USER",
    });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("message", "User registered and logged in successfully!");
    expect(res.body.user).to.have.property("id");
    userId = res.body.user.id;
    verificationCode = res.body.user.verifyCode;
  });

  it("✅ Debería iniciar sesión correctamente", async () => {
    const res = await request.post("/api/users/login").send({
      email: testEmail,
      password: testPassword,
    });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "User logged in!");
    token = res.body.token;
  });

  it("✅ Debería verificar la cuenta del usuario", async () => {
    const res = await request.get(`/api/users/verify?code=${verificationCode}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "User verified!");
  });

  it("✅ Debería solicitar un enlace de restablecimiento de contraseña", async () => {
    const res = await request.post("/api/users/forgot").send({ email: testEmail });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "Reset token generated");
    resetToken = res.body.token;
  });

  it("✅ Debería restablecer la contraseña correctamente", async () => {
    const res = await request.put("/api/users/reset").send({
      token: resetToken,
      newPassword: "newSecurePass456",
    });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "Password updated successfully");
  });

  it("✅ Debería obtener la información del usuario autenticado", async () => {
    const res = await request.get("/api/users/current").set("Cookie", `token=${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message");
    expect(res.body).to.have.property("online", true);
  });

  it("✅ Debería cerrar sesión correctamente", async () => {
    const res = await request.post("/api/users/signout").set("Cookie", `token=${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "User signed out!");
  });
});
