import express from 'express';
const router = express.Router();

// Path inicial http://my-app.com/
router.get('/', (req, res) => {
    res
        .status(200)
        .json({
            error: false,
            code: 200,
            message: 'Bienvenido a su API de sorteos!'
        });
});

// Path http://my-app.com/users
router.use('/users', require('./user.router'));
router.use('/lotterys', require('./lottery.router'));
router.use('/auth', require('./auth.router'));
router.use('/participant', require('./participant.router'));

module.exports = router;