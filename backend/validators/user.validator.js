const { body, validationResult } = require('express-validator');

/**
 * Middleware xử lý lỗi validation
 */
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

/**
 * ✅ Validate cho đăng ký tài khoản
 */
const validateRegister = [
    body('username')
        .notEmpty().withMessage('Username là bắt buộc')
        .isLength({ min: 3 }).withMessage('Username phải có ít nhất 3 ký tự'),
    body('email')
        .notEmpty().withMessage('Email là bắt buộc')
        .isEmail().withMessage('Email không hợp lệ'),
    body('password')
        .notEmpty().withMessage('Mật khẩu là bắt buộc')
        .isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự'),
    body('phone')
        .optional()
        .matches(/^\+?[0-9]{8,15}$/).withMessage('Số điện thoại không hợp lệ'),
    body('profile_picture')
        .optional()
        .isURL().withMessage('Ảnh đại diện phải là URL hợp lệ'),

    handleValidation
];

/**
 * ✅ Validate cho đăng nhập (email hoặc username)
 */
const validateLogin = [
    body('identifier')
        .notEmpty().withMessage('Email hoặc username là bắt buộc')
        .isString().withMessage('Trường identifier phải là chuỗi'),
    body('password')
        .notEmpty().withMessage('Mật khẩu là bắt buộc'),

    handleValidation
];

/**
 * ✅ Validate cho đăng nhập bằng số điện thoại
 */
const validatePhoneLogin = [
    body('phone')
        .notEmpty().withMessage('Số điện thoại là bắt buộc')
        .matches(/^\+?[0-9]{8,15}$/).withMessage('Số điện thoại không hợp lệ'),
    body('password')
        .notEmpty().withMessage('Mật khẩu là bắt buộc'),

    handleValidation
];

module.exports = {
    validateRegister,
    validateLogin,
    validatePhoneLogin
};
