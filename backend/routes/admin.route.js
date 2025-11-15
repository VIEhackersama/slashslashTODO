const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const auth = require('../middlewares/auth.middleware');
const allowRoles = require('../middlewares/role.middleware');

router.get('/all', auth, allowRoles('admin'), async (req, res) => {
    try {
        const users = await User.find().select('-password_hash');
        res.json({ status: 'success', data: users });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

module.exports = router;
