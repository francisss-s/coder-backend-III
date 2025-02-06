import { generateAndSaveMocks, generateMockUsers } from "../../controllers/mocks.controller.js";

import CustomRouter from "../../utils/CustomRouter.util.js";

class MocksApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    /**
     * @swagger
     * /mocks/mockingusers:
     *   get:
     *     summary: Genera usuarios mockeados sin guardarlos en la base de datos.
     *     tags: [Mocks]
     *     description: Retorna una lista de usuarios falsos generados con Faker.js.
     *     parameters:
     *       - name: count
     *         in: query
     *         required: false
     *         description: Número de usuarios a generar (por defecto 10).
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Lista de usuarios generados correctamente.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 users:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       first_name:
     *                         type: string
     *                         example: John
     *                       last_name:
     *                         type: string
     *                         example: Doe
     *                       email:
     *                         type: string
     *                         example: john.doe@example.com
     *                       age:
     *                         type: integer
     *                         example: 30
     *                       password:
     *                         type: string
     *                         example: securePass123
     *                       role:
     *                         type: string
     *                         example: USER
     */
    this.read("/mockingusers", ["PUBLIC"], generateMockUsers);

    /**
     * @swagger
     * /mocks/{users}/{products}:
     *   post:
     *     summary: Genera y guarda usuarios y productos mockeados en la base de datos.
     *     tags: [Mocks]
     *     description: Genera una cantidad específica de usuarios y productos falsos y los almacena en MongoDB.
     *     parameters:
     *       - name: users
     *         in: path
     *         required: true
     *         description: Número de usuarios a generar.
     *         schema:
     *           type: integer
     *       - name: products
     *         in: path
     *         required: true
     *         description: Número de productos a generar.
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Datos generados y guardados correctamente.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: Mock data inserted successfully
     *                 users:
     *                   type: integer
     *                   example: 10
     *                 products:
     *                   type: integer
     *                   example: 5
     *       400:
     *         description: Error en la validación de los datos enviados.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: Bad Request
     */
    this.create("/:users/:products", ["PUBLIC"], generateAndSaveMocks);
  };
}

const mocksApiRouter = new MocksApiRouter();
export default mocksApiRouter.getRouter();
