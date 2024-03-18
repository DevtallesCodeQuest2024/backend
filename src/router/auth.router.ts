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
import { loginDiscord } from "../controller/user.controller";

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
  passport.authenticate("discord", {
    failureRedirect: `${process.env.PATH_WEB}`
  }),
  loginDiscord
);

module.exports = router;
