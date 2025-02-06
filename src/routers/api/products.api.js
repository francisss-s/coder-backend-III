import {
  createProduct,
  destroyProduct,
  readProducts,
  updateProduct,
} from "../../controllers/products.controller.js";

import CustomRouter from "../../utils/CustomRouter.util.js";
import passportCb from "../../middlewares/passportCb.mid.js";

class ProductsApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    /**
     * @swagger
     * /products:
     *   post:
     *     summary: Crea un nuevo producto.
     *     tags: [Products]
     *     description: Agrega un nuevo producto a la base de datos.
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *                 example: iPhone 14
     *               description:
     *                 type: string
     *                 example: Smartphone de Apple
     *               price:
     *                 type: number
     *                 example: 999.99
     *               stock:
     *                 type: integer
     *                 example: 50
     *               category:
     *                 type: string
     *                 enum: ["celulares", "tablets", "computadoras"]
     *                 example: celulares
     *     responses:
     *       201:
     *         description: Producto creado exitosamente.
     *       400:
     *         description: Error en la validación de los datos.
     *       403:
     *         description: No autorizado para realizar esta acción.
     */
    this.create("/", ["PUBLIC"], createProduct);

    /**
     * @swagger
     * /products:
     *   get:
     *     summary: Obtiene todos los productos.
     *     tags: [Products]
     *     description: Retorna una lista con todos los productos almacenados en la base de datos.
     *     responses:
     *       200:
     *         description: Lista de productos obtenida exitosamente.
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
     *                   title:
     *                     type: string
     *                     example: iPhone 14
     *                   description:
     *                     type: string
     *                     example: Smartphone de Apple
     *                   price:
     *                     type: number
     *                     example: 999.99
     *                   stock:
     *                     type: integer
     *                     example: 50
     *                   category:
     *                     type: string
     *                     example: celulares
     */
    this.read("/", ["PUBLIC"], readProducts);

    /**
     * @swagger
     * /products/{id}:
     *   put:
     *     summary: Actualiza un producto existente.
     *     tags: [Products]
     *     description: Modifica los datos de un producto en la base de datos.
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID del producto a actualizar.
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *                 example: Samsung Galaxy S22
     *               description:
     *                 type: string
     *                 example: Smartphone de Samsung
     *               price:
     *                 type: number
     *                 example: 799.99
     *               stock:
     *                 type: integer
     *                 example: 30
     *               category:
     *                 type: string
     *                 enum: ["celulares", "tablets", "computadoras"]
     *                 example: celulares
     *     responses:
     *       200:
     *         description: Producto actualizado exitosamente.
     *       400:
     *         description: Error en la validación de los datos.
     *       403:
     *         description: No autorizado para realizar esta acción.
     *       404:
     *         description: Producto no encontrado.
     */
    this.update("/:id", ["ADMIN"], passportCb("admin"), updateProduct);

    /**
     * @swagger
     * /products/{id}:
     *   delete:
     *     summary: Elimina un producto.
     *     tags: [Products]
     *     description: Borra un producto de la base de datos.
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID del producto a eliminar.
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Producto eliminado exitosamente.
     *       403:
     *         description: No autorizado para realizar esta acción.
     *       404:
     *         description: Producto no encontrado.
     */
    this.destroy("/:id", ["ADMIN"], passportCb("admin"), destroyProduct);
  };
}

const productsApiRouter = new ProductsApiRouter();
export default productsApiRouter.getRouter();
