const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../services/token.service');

class UserService {

    async register(data) {
        const user = new User({
            username: data.username,
            email: data.email,
            password_hash: data.password,  
            phone: data.phone,
            profile_picture: data.profile_picture
        });

        await user.save();
        return user;
    }

    async login(identifier, password) {
        const user = await User.findOne({
            $or: [
                { email: identifier },
                { username: identifier },
                { phone: identifier }
            ]
        });

        if (!user) throw new Error("User not found");

        const isMatch = await user.comparePassword(password);
        if (!isMatch) throw new Error("Invalid password");

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refresh_token = refreshToken;
        await user.save();

        return { user, accessToken, refreshToken };
    }

    async refreshToken(oldRefreshToken) {
        if (!oldRefreshToken) throw new Error("Refresh token is required");

        let payload;
        try {
            payload = jwt.verify(oldRefreshToken, process.env.JWT_REFRESH_SECRET);
        } catch (err) {
            throw new Error("Invalid or expired refresh token");
        }

        const user = await User.findById(payload.id);
        if (!user) throw new Error("User not found");

        if (user.refresh_token !== oldRefreshToken) {
            throw new Error("Refresh token mismatch");
        }

        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        user.refresh_token = newRefreshToken;
        await user.save();

        return { newAccessToken, newRefreshToken };
    }

    async logout(userId) {
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");

        user.refresh_token = null;
        await user.save();

        return true;
    }
}

module.exports = new UserService();
