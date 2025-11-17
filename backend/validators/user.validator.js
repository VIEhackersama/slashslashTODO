const { body, validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            errors: errors.array()
        });
    }
    next();
};

const validateRegister = [
    body('username')
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('phone')
        .optional()
        .matches(/^\+?[0-9]{8,15}$/).withMessage('Invalid phone number'),
    body('profile_picture')
        .optional()
        .isURL().withMessage('Profile picture must be a valid URL'),

    handleValidation
];

const validateLogin = [
    body('identifier')
        .notEmpty().withMessage('Email or username is required')
        .isString().withMessage('Identifier must be a string'),
    body('password')
        .notEmpty().withMessage('Password is required'),

    handleValidation
];

const validatePhoneLogin = [
    body('phone')
        .notEmpty().withMessage('Phone number is required')
        .matches(/^\+?[0-9]{8,15}$/).withMessage('Invalid phone number'),
    body('password')
        .notEmpty().withMessage('Password is required'),

    handleValidation
];

module.exports = {
    validateRegister,
    validateLogin,
    validatePhoneLogin
};
