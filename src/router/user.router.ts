import express, { Router } from 'express';
const router: Router = express.Router();

import {
    signup,
    findAll
} from '../controller/user.controller';

import { createUserSchema } from '../validations/user-validation';
import { validator } from '../middlewares/joi-validator.middleware';
import { tokenNotFoundException, tokenNotValidException } from "../middlewares/exceptions/auth.exception";
import { userAlreadyExistsException } from '../middlewares/exceptions/user.exception';

router.post(
    '/',
    tokenNotFoundException,
    tokenNotValidException,
    validator.body( createUserSchema ),
    userAlreadyExistsException,
    signup
);

router.get('/', findAll);

module.exports = router;