import express, { Router } from "express";
const router: Router = express.Router();

import { create, remove } from "../controller/participant.controller";
import { tokenNotFoundException, tokenNotValidException } from "../middlewares/exceptions/auth.exception";
import {participantExistException} from "../middlewares/exceptions/participant.exception";
import {validator} from "../middlewares/joi-validator.middleware";
import {createParticipantSchema} from "../validations/participant-validation";

router.post(
  "/",
    tokenNotFoundException,
    tokenNotValidException,
    validator.body(createParticipantSchema),
    participantExistException,
    create
);

router.delete(
    "/",
    tokenNotFoundException,
    tokenNotValidException,
    validator.body(createParticipantSchema),
    remove
);

module.exports = router;
