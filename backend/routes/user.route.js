const express = require('express');
const router = express.Router();

const userService = require('../services/user.service');
const auth = require('../middlewares/auth.middleware');
const { validateRegister, validateLogin } = require('../validators/user.validator');

router.post('/register', validateRegister, async (req, res) => {
    try {
        await userService.register(req.body);
        res.status(201).json({ status: 'success', message: "Account created" });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});

router.post('/login', validateLogin, async (req, res) => {
    try {
        const { user, token } = await userService.login(
            req.body.identifier,
            req.body.password
        );

        res.status(200).json({
            status: 'success',
            token,
            data: {
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});

router.get('/me', auth, async (req, res) => {
    res.status(200).json({ status: 'success', data: req.user });
});

module.exports = router;
