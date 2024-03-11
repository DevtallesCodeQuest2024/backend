import express, { Request, Response, Router } from 'express';
const router: Router = express.Router();

import {
    signup,
    findAll
} from '../controller/user.controller';

router.post('/', signup);
router.get('/', findAll);

module.exports = router;