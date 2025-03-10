import { createService, destroyService, forgotService, readService, resetPasswordService, updateService, verifyService } from "../../src/services/user.service.js";

import assert from "assert";
import dbConnect from "../../src/utils/dbConnect.util.js";

describe("🧪 Mocha - User Service Tests", () => {
  let userId = "";
  let resetToken = "";
  const testEmail = `test${Date.now()}@email.com`;
  const testPassword = "password123";

  before(async () => {
    console.log("🔥 Iniciando tests de servicios de usuario...");
    await dbConnect();
  });

  it("✅ Debería crear un usuario correctamente", async () => {
    const newUser = {
      first_name: "John",
      last_name: "Doe",
      email: testEmail,
      age: 30,
      password: testPassword,
      role: "USER",
      verifyCode: "123456",
      resetToken: "123456",
      resetTokenExpires: "2025-07-20T00:00:00.000Z",
    };

    const user = await createService(newUser);
    assert.ok(user);
    assert.strictEqual(user.first_name, "John");
    assert.strictEqual(user.last_name, "Doe");
    assert.ok(user._id);
    userId = user._id.toString();
  });

  it("✅ Debería leer un usuario por ID", async () => {
    assert.ok(userId, "❌ userId no está definido o es nulo"); // Verifica que userId no sea undefined

    const user = await readService(userId)

    assert.ok(user, "❌ No se encontró ningún usuario con ese ID");
    assert.strictEqual(user._id.toString(), userId);
});


  it("✅ Debería actualizar el nombre del usuario", async () => {
    const updatedUser = await updateService(userId, { first_name: "UpdatedTest" });
    assert.ok(updatedUser);
    assert.strictEqual(updatedUser.first_name, "UpdatedTest");
  });

  it("✅ Debería generar un token de recuperación de contraseña", async () => {
    const result = await forgotService(testEmail);
    assert.ok(result);
    assert.ok(result.token);
    resetToken = result.token;
  });

  it("✅ Debería permitir restablecer la contraseña", async () => {
    const user = await resetPasswordService(resetToken, "newSecurePass456");
    assert.ok(user);
  });

  it("✅ Debería eliminar el usuario correctamente", async () => {
    const deletedUser = await destroyService(userId);
    assert.ok(deletedUser);
    assert.strictEqual(deletedUser._id.toString(), userId);
  });
});
