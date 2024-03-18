import "dotenv/config";
import express from "express";
import passport from "passport";
import cors from "cors";

const session = require("express-session");

import { initDatabase } from "./database/db";
import "./config/passport-discord.config";

const app = express();

//Swagger documentation
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

initDatabase();
import "./database/associations";

app.use(express.json()); //Parsea el body
app.use(express.urlencoded({ extended: false })); //Parsea URL codificados del body
app.use(cors()); //Seguridad en peticiones

app.use(
  session({
    secret: "secreto",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1", require("./router/index"));
app.use(
  "/api/v1/documentation",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

import { handleErrorJoi } from "./middlewares/joi-validation-error";
app.use(handleErrorJoi);

import { unknownException } from "./middlewares/exceptions/unknownException";
app.use(unknownException);

const PORT = process.env.PORT || 4006;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
