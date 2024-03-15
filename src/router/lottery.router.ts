import express, { Router } from "express";

// controllers
import lotteryController from "../controller/lottery.controller";
import {
  tokenNotFoundException,
  tokenNotValidException
} from "../middlewares/exceptions/auth.exception";

const router: Router = express.Router();

router
  .route("/")
  .get(
    tokenNotFoundException,
    tokenNotValidException,
    lotteryController.getAllLotterys
  )
  .post(
    tokenNotFoundException,
    tokenNotValidException,
    lotteryController.createLottery
  )
  .put(
    tokenNotFoundException,
    tokenNotValidException,
    lotteryController.updateLottery
  )
  .delete(
    tokenNotFoundException,
    tokenNotValidException,
    lotteryController.deleteLottery
  );

router.route("/public").get(lotteryController.getAllLotterysActive);

router.route("/:id").get(lotteryController.getLotteryById);

module.exports = router;
