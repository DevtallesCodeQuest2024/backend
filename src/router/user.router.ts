import express, { Router } from "express";
const router: Router = express.Router();

import {
  login,
  signup,
  findAll,
  getUserByToken
} from "../controller/user.controller";

import {
  createUserSchema,
  loginUserSchema
} from "../validations/user-validation";
import { validator } from "../middlewares/joi-validator.middleware";
import {
  tokenNotFoundException,
  tokenNotValidException
} from "../middlewares/exceptions/auth.exception";
import {
  userAlreadyExistsException,
  userOrPassWrongException
} from "../middlewares/exceptions/user.exception";

router
  .route("/")
  .post(
    tokenNotFoundException,
    tokenNotValidException,
    validator.body(createUserSchema),
    userAlreadyExistsException,
    signup
  )
  .get(findAll);

router.post(
  "/login",
  validator.body(loginUserSchema),
  userOrPassWrongException,
  login
);
router.get(
  "/renew",
  tokenNotFoundException,
  tokenNotValidException,
  getUserByToken
);

module.exports = router;
