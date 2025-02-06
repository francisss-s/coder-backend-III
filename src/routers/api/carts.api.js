import {
  createCart,
  destroyCart,
  purchaseCart,
  readCartsFromUser,
  updateCart
} from "../../controllers/carts.controller.js";

import CustomRouter from "../../utils/CustomRouter.util.js";

class CartsApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    /**
     * @swagger
     * /carts:
     *   post:
     *     summary: Crea un nuevo carrito de compras.
     *     tags: [Carts]
     *     description: Permite a un usuario crear un carrito de compras vacío.
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       201:
     *         description: Carrito creado exitosamente.
     *       400:
     *         description: Error al crear el carrito.
     */
    this.create("/", ["USER"], createCart);

    /**
     * @swagger
     * /carts/{user_id}:
     *   get:
     *     summary: Obtiene los carritos de un usuario.
     *     tags: [Carts]
     *     description: Retorna una lista de los carritos asociados a un usuario específico.
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: user_id
     *         in: path
     *         required: true
     *         description: ID del usuario cuyos carritos se quieren obtener.
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Lista de carritos obtenida correctamente.
     *       404:
     *         description: No se encontraron carritos para el usuario.
     */
    this.read("/:user_id", ["USER", "ADMIN"], readCartsFromUser);

    /**
     * @swagger
     * /carts/{id}:
     *   put:
     *     summary: Actualiza un carrito de compras.
     *     tags: [Carts]
     *     description: Permite modificar un carrito, añadiendo o eliminando productos.
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID del carrito a actualizar.
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               products:
     *                 type: array
     *                 items:
     *                   type: object
     *                   properties:
     *                     product_id:
     *                       type: string
     *                       example: 60f7ae83b6c3a52730f12e3b
     *                     quantity:
     *                       type: integer
     *                       example: 2
     *     responses:
     *       200:
     *         description: Carrito actualizado correctamente.
     *       400:
     *         description: Error en la validación de los datos.
     *       404:
     *         description: Carrito no encontrado.
     */
    this.update("/:id", ["USER", "ADMIN"], updateCart);

    /**
     * @swagger
     * /carts/{id}:
     *   delete:
     *     summary: Elimina un carrito de compras.
     *     tags: [Carts]
     *     description: Permite eliminar un carrito de compras.
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID del carrito a eliminar.
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Carrito eliminado correctamente.
     *       404:
     *         description: Carrito no encontrado.
     */
    this.destroy("/:id", ["USER", "ADMIN"], destroyCart);

    /**
     * @swagger
     * /carts/{cid}/purchase:
     *   post:
     *     summary: Realiza la compra de un carrito.
     *     tags: [Carts]
     *     description: Procesa la compra de un carrito y genera un ticket de compra.
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: cid
     *         in: path
     *         required: true
     *         description: ID del carrito que se desea comprar.
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Compra realizada exitosamente.
     *       400:
     *         description: Error en la compra.
     *       404:
     *         description: Carrito no encontrado.
     */
    this.create("/:cid/purchase", ["USER"], purchaseCart);
  };
}

const cartsApiRouter = new CartsApiRouter();
export default cartsApiRouter.getRouter();
