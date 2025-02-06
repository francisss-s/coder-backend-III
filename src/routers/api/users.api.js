import { forgotPassword, resetPassword, verifyAccount } from "../../controllers/user.controller.js";

import CustomRouter from "../../utils/CustomRouter.util.js";
import passportCb from "../../middlewares/passportCb.mid.js";

class UsersApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    /**
     * @swagger
     * /users/register:
     *   post:
     *     summary: Registra un nuevo usuario.
     *     tags: [Auth]
     *     description: Crea un nuevo usuario en la base de datos y devuelve un token de sesión en una cookie.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               first_name:
     *                 type: string
     *                 example: John
     *               last_name:
     *                 type: string
     *                 example: Doe
     *               email:
     *                 type: string
     *                 example: john.doe@example.com
     *               password:
     *                 type: string
     *                 example: securePass123
     *     responses:
     *       201:
     *         description: Usuario registrado y logueado exitosamente.
     *       400:
     *         description: Error en la validación de los datos.
     */
    this.create("/register", ["PUBLIC"], passportCb("register"), register);

    /**
     * @swagger
     * /users/login:
     *   post:
     *     summary: Inicia sesión de usuario.
     *     tags: [Auth]
     *     description: Autentica a un usuario y devuelve un token de sesión en una cookie.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 example: john.doe@example.com
     *               password:
     *                 type: string
     *                 example: securePass123
     *     responses:
     *       200:
     *         description: Usuario autenticado correctamente.
     *       401:
     *         description: Credenciales incorrectas.
     */
    this.create("/login", ["PUBLIC"], passportCb("login"), login);

    /**
     * @swagger
     * /users/signout:
     *   post:
     *     summary: Cierra sesión de usuario.
     *     tags: [Auth]
     *     description: Elimina la cookie de sesión del usuario.
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Usuario deslogueado correctamente.
     */
    this.create("/signout", ["USER", "ADMIN"], passportCb("signout"), signout);

    /**
     * @swagger
     * /users/current:
     *   post:
     *     summary: Verifica el estado de la sesión del usuario.
     *     tags: [Auth]
     *     description: Retorna información sobre si el usuario está en línea o fuera de línea.
     *     responses:
     *       200:
     *         description: Estado de la sesión del usuario.
     */
    this.create("/current", ["PUBLIC"], passportCb("current"), current);

    /**
     * @swagger
     * /users/verify:
     *   get:
     *     summary: Verifica la cuenta de un usuario.
     *     tags: [Auth]
     *     description: Activa una cuenta de usuario mediante un código de verificación.
     *     parameters:
     *       - name: token
     *         in: query
     *         required: true
     *         description: Token de verificación enviado por correo electrónico.
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Cuenta verificada correctamente.
     *       400:
     *         description: Token inválido o expirado.
     */
    this.read("/verify", ["PUBLIC"], verifyAccount);

    /**
     * @swagger
     * /users/forgot:
     *   post:
     *     summary: Solicita un enlace para restablecer la contraseña.
     *     tags: [Auth]
     *     description: Envía un correo con un enlace para restablecer la contraseña de usuario.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 example: john.doe@example.com
     *     responses:
     *       200:
     *         description: Enlace de restablecimiento enviado.
     *       404:
     *         description: Usuario no encontrado.
     */
    this.create("/forgot", ["PUBLIC"], forgotPassword);

    /**
     * @swagger
     * /users/reset:
     *   put:
     *     summary: Restablece la contraseña de usuario.
     *     tags: [Auth]
     *     description: Permite al usuario cambiar su contraseña mediante un token de restablecimiento.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               token:
     *                 type: string
     *                 description: Token de restablecimiento recibido por correo.
     *                 example: abc123xyz
     *               newPassword:
     *                 type: string
     *                 description: Nueva contraseña elegida por el usuario.
     *                 example: newSecurePass456
     *     responses:
     *       200:
     *         description: Contraseña restablecida correctamente.
     *       400:
     *         description: Token inválido o expirado.
     */
    this.update("/reset", ["PUBLIC"], resetPassword);
  };
}

const users = new UsersApiRouter();
export default users.getRouter();

/**
 * Funciones auxiliares para el manejo de autenticación
 */

async function register(req, res, next) {
  const { user } = req;
  const token = user.token;

  const opts = {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  res.cookie("token", token, opts);

  return res.status(201).json({
    message: "User registered and logged in successfully!",
    user: {
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    },
  });
}

async function login(req, res, next) {
  const { token } = req.user;
  const opts = { maxAge: 60 * 60 * 24 * 7, httpOnly: true };
  const message = "User logged in!";
  const response = "OK";
  return res.cookie("token", token, opts).json200(response, message);
}

function signout(req, res, next) {
  const message = "User signed out!";
  const response = "OK";
  return res.clearCookie("token").json200(response, message);
}

async function current(req, res, next) {
  if (req.cookies.token) {
    return res.status(200).json({
      message: req.user,
      online: true,
    });
  } else
    return res.status(200).json({
      message: req.user.email.toUpperCase() + " IS OFFLINE",
      online: false,
    });
}
