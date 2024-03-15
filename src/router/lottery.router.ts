import express, { Router } from "express";

// controllers
import lotteryController from "../controller/lottery.controller";
import {
  tokenNotFoundException,
  tokenNotValidException
} from "../middlewares/exceptions/auth.exception";
import { validator } from "../middlewares/joi-validator.middleware";
import { createLotterySchema, updateLotterySchema, deleteLotterySchema } from "../validations/lottery-validation";
import { authorizedRoleException } from "../middlewares/exceptions/role.exception";

const router: Router = express.Router();

router
  .route("/")
  .get(
    tokenNotFoundException,
    tokenNotValidException,
    authorizedRoleException,
    lotteryController.getAllLotterys
  )
  .post(
    tokenNotFoundException,
    tokenNotValidException,
    authorizedRoleException,
    validator.body(createLotterySchema),
    lotteryController.createLottery
  )
  .put(
    tokenNotFoundException,
    tokenNotValidException,
    authorizedRoleException,
    validator.body(updateLotterySchema),
    lotteryController.updateLottery
  )
  .delete(
    tokenNotFoundException,
    tokenNotValidException,
    authorizedRoleException,
    validator.body(deleteLotterySchema),
    lotteryController.deleteLottery
  );

router.route("/public").get(lotteryController.getAllLotterysActive);

router.route("/:id").get(lotteryController.getLotteryById);

module.exports = router;
