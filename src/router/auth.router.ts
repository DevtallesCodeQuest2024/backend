import express, { Router } from 'express';
const router: Router = express.Router();

import {
    receiveEmail,
    verifyToken
} from '../controller/auth.controller';

import { createEmailAuthValidation } from '../validations/email-auth-validation';
import { validator } from '../middlewares/joi-validator.middleware';

import {
    emailDomainIsNotValidException,
    tokenNotFoundException,
    tokenNotValidException
} from '../middlewares/exceptions/auth.exception';

import  {emailUserAlreadyExistsException } from "../middlewares/exceptions/user.exception";

router.post('/', validator.body(createEmailAuthValidation), emailDomainIsNotValidException, emailUserAlreadyExistsException, receiveEmail);
router.get('/', tokenNotFoundException, tokenNotValidException, verifyToken);

module.exports = router;