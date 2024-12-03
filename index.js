import 'dotenv/config.js';

import dbConnect from "./src/utils/dbConnect.util.js";
import express from "express";
import morgan from "morgan";
import session from "express-session"

const server = express();
const port = process.env.PORT || 8080;
const ready = () => {
    console.log(`Server is running on port ${port}`); 
    dbConnect();
};

server.listen(port, ready)

// middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"))
server.use(morgan("dev"))