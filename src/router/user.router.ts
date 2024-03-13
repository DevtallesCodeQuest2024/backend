import express, { Router } from 'express';
const router: Router = express.Router();

import {
    login,
    signup,
    findAll
} from '../controller/user.controller';

import { createUserSchema } from '../validations/user-validation';
import { validator } from '../middlewares/joi-validator.middleware';

router.post('/', validator.body( createUserSchema ), signup);
router.post('/login', validator.body( createUserSchema ), login);
router.get('/', findAll);

module.exports = router;