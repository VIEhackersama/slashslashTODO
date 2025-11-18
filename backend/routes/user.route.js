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
        const { user, accessToken, refreshToken } = await userService.login(
            req.body.identifier,
            req.body.password
        );

        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,        
            secure: true,           
            sameSite: "strict",    
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        return res.json({
            status: "success",
            accessToken, 
            data: {
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});



router.post('/refresh-token', async (req, res) => {
    try {
        const oldRefreshToken = req.cookies.refresh_token;
        if (!oldRefreshToken) {
            return res.status(401).json({ status: 'error', message: 'No refresh token provided' });
        }

        const { newAccessToken, newRefreshToken } =
            await userService.refreshToken(oldRefreshToken);

        res.cookie("refresh_token", newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({
            status: "success",
            accessToken: newAccessToken
        });

    } catch (err) {
        res.status(401).json({ status: "error", message: err.message });
    }
});


router.get('/me', auth, async (req, res) => {
    res.status(200).json({ status: 'success', data: req.user });
});

module.exports = router;
