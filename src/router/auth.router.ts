import express, { Router } from "express";
import passport from "passport";
const router: Router = express.Router();

import { receiveEmail, verifyToken } from "../controller/auth.controller";

import { createEmailAuthValidation } from "../validations/email-auth-validation";
import { validator } from "../middlewares/joi-validator.middleware";

import {
  emailDomainIsNotValidException,
  tokenNotFoundException,
  tokenNotValidException
} from "../middlewares/exceptions/auth.exception";

import { emailUserAlreadyExistsException } from "../middlewares/exceptions/user.exception";

router
  .route("/")
  .get(tokenNotFoundException, tokenNotValidException, verifyToken)
  .post(
    validator.body(createEmailAuthValidation),
    emailDomainIsNotValidException,
    emailUserAlreadyExistsException,
    receiveEmail
  );

router.get("/discord", passport.authenticate("discord"));

router.get(
  "/discord/callback",
  passport.authenticate("discord", { failureRedirect: "/" }),
  (req, res) => {
    console.log("Código de autorización recibido:", req.query.code);

    res.redirect("http://localhost:4200/sorteos");
  }
);

module.exports = router;
