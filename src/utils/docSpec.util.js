import { __dirname } from "../utils.js";
import swaggerJSDoc from "swagger-jsdoc";

const opts ={
    definition:{
        openapi:"3.1.0",
        info: {
            title: "CoderCommerce 70210",
            version: "1.0.0",
            description: "Documentación de la API de CoderCommerce 70210",
        }
    },
    apis:[__dirname + "/docs/*.yaml"]
}
console.log('dir name swagger: -> -> ',__dirname + "/docs/*.yaml");
const docsSpec = swaggerJSDoc(opts);
export default docsSpec;