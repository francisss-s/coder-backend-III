import { createUser, destroyUser, readUsers, updateUser } from "../../controllers/user.controller.js";

import CustomRouter from "../../utils/CustomRouter.util.js";

class UsersApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    /**
     * @swagger
     * /users:
     *   post:
     *     summary: Crea un nuevo usuario.
     *     tags: [Users]
     *     description: Agrega un nuevo usuario a la base de datos. Solo permitido para administradores.
     *     security:
     *       - bearerAuth: []
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
     *               age:
     *                 type: integer
     *                 example: 30
     *               password:
     *                 type: string
     *                 example: securePass123
     *               role:
     *                 type: string
     *                 enum: ["USER", "ADMIN"]
     *                 example: USER
     *     responses:
     *       201:
     *         description: Usuario creado exitosamente.
     *       400:
     *         description: Error en la validación de los datos.
     *       403:
     *         description: No autorizado para realizar esta acción.
     */
    this.create("/", ["ADMIN"], createUser);

    /**
     * @swagger
     * /users:
     *   get:
     *     summary: Obtiene todos los usuarios.
     *     tags: [Users]
     *     description: Retorna una lista con todos los usuarios almacenados en la base de datos. Solo permitido para administradores.
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de usuarios obtenida exitosamente.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: string
     *                     example: 60f7ae83b6c3a52730f12e3b
     *                   first_name:
     *                     type: string
     *                     example: John
     *                   last_name:
     *                     type: string
     *                     example: Doe
     *                   email:
     *                     type: string
     *                     example: john.doe@example.com
     *                   age:
     *                     type: integer
     *                     example: 30
     *                   role:
     *                     type: string
     *                     example: USER
     */
    this.read("/", ["ADMIN"], readUsers);

    /**
     * @swagger
     * /users/{id}:
     *   put:
     *     summary: Actualiza un usuario existente.
     *     tags: [Users]
     *     description: Modifica los datos de un usuario en la base de datos. Permitido para usuarios y administradores.
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID del usuario a actualizar.
     *         schema:
     *           type: string
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
     *               age:
     *                 type: integer
     *                 example: 30
     *               role:
     *                 type: string
     *                 enum: ["USER", "ADMIN"]
     *                 example: USER
     *     responses:
     *       200:
     *         description: Usuario actualizado exitosamente.
     *       400:
     *         description: Error en la validación de los datos.
     *       403:
     *         description: No autorizado para realizar esta acción.
     *       404:
     *         description: Usuario no encontrado.
     */
    this.update("/:id", ["USER", "ADMIN"], updateUser);

    /**
     * @swagger
     * /users/{id}:
     *   delete:
     *     summary: Elimina un usuario.
     *     tags: [Users]
     *     description: Borra un usuario de la base de datos. Permitido para usuarios y administradores.
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID del usuario a eliminar.
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Usuario eliminado exitosamente.
     *       403:
     *         description: No autorizado para realizar esta acción.
     *       404:
     *         description: Usuario no encontrado.
     */
    this.destroy("/:id", ["USER", "ADMIN"], destroyUser);
  };
}

const usersApiRouter = new UsersApiRouter();
export default usersApiRouter.getRouter();
