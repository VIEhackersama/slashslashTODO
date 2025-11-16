const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { validateRegister, validateLogin, validatePhoneLogin } = require('../validators/user.validator');
const auth = require('../middlewares/auth.middleware');

router.post('/register', validateRegister, async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password_hash: req.body.password,
            phone: req.body.phone,
            profile_picture: req.body.profile_picture
        });

        await user.save();
        res.status(201).json({ status: 'success', message: 'Tạo tài khoản thành công!' });
    } catch (err) {
        if (err.code === 11000) {
            const field = Object.keys(err.keyValue)[0];
            return res.status(400).json({
                status: 'error',
                message: `Giá trị ${field} đã tồn tại`
            });
        }
        res.status(500).json({ status: 'error', message: err.message });
    }
});


router.post('/login', validateLogin, async (req, res) => {
    try {
        const { identifier, password } = req.body;
        // identifier = email hoặc username

        const user = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }]
        });

        if (!user)
            return res.status(404).json({ status: 'error', message: 'Account unavailable' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch)
            return res.status(401).json({ status: 'error', message: 'Wrong password' });

        const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );

        res.status(200).json({
            status: 'success',
            message: 'Logged in successfully',
            token,
            data: {
                username: user.username,
                email: user.email,
                phone: user.phone,
                profile_picture: user.profile_picture
            }
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});


router.post('/login/phone', validatePhoneLogin, async (req, res) => {
    try {
        const { phone, password } = req.body;

        if (!phone || !password)
            return res.status(400).json({ status: 'error', message: 'Number phone not found' });

        const user = await User.findOne({ phone });
        if (!user)
            return res.status(404).json({ status: 'error', message: 'Could not find account with this number' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch)
            return res.status(401).json({ status: 'error', message: 'Wrong password' });

        const token = jwt.sign(
            { id: user._id, username: user.username, phone: user.phone, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );

        res.status(200).json({
            status: 'success',
            message: 'Logged in successfully',
            token,
            data: {
                username: user.username,
                email: user.email,
                phone: user.phone,
                profile_picture: user.profile_picture
            }
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});


router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password_hash');
        if (!user)
            return res.status(404).json({ status: 'error', message: 'User not found' });

        res.status(200).json({ status: 'success', data: user });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});


router.put('/update', auth, async (req, res) => {
    try {
        const { full_name, phone, profile_picture } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { full_name, phone, profile_picture },
            { new: true, runValidators: true }
        ).select('-password_hash');

        res.status(200).json({
            status: 'success',
            message: 'Updated successfully',
            data: user
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

module.exports = router;
