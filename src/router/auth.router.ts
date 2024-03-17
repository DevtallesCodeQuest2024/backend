import express, { Router } from 'express';
const router: Router = express.Router();

import {
    receiveEmail,
    discordAuth,
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
import passport from "passport";

router.post('/', validator.body(createEmailAuthValidation), emailDomainIsNotValidException, emailUserAlreadyExistsException, receiveEmail);
router.get('/', tokenNotFoundException, tokenNotValidException, verifyToken);
router.get('/discord', discordAuth);


router.get('/discord/callback', passport.authenticate('discord', { failureRedirect: '/login' }), (req, res) => {

    // Aquí puedes manejar el código de autorización, por ejemplo, intercambiándolo por tokens de acceso
    console.log('Código de autorización recibido:', req.query.code);

    res.redirect('/');
});
router.get('/discord', passport.authenticate('discord'));

module.exports = router;