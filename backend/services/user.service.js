const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

class UserService {

    async register(data) {
        const user = new User(data);
        await user.save();
        return user;
    }

    async login(identifier, password) {
        const user = await User.findOne({
            $or: [
                { email: identifier },
                { username: identifier }
            ]
        });

        if (!user) throw new Error("User not found");

        const isMatch = await user.comparePassword(password);
        if (!isMatch) throw new Error("Invalid password");

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        return { user, token };
    }
}

module.exports = new UserService();
