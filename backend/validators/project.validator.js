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

const validateCreateProject = [
    body('name')
        .notEmpty().withMessage('Project name is requred')
        .isLength({ min: 2 }).withMessage('Must at least have more than 2 letters'),
    body('repository_url')
        .optional()
        .isURL().withMessage('Invalid repository URL'),
    handleValidation
];

const validateUpdateProject = [
    body('name')
        .optional()
        .isLength({ min: 2 }).withMessage('Must at least have more than 2 letters'),
    body('repository_url')
        .optional()
        .isURL().withMessage('Invalid repository URL'),
    handleValidation
];

module.exports = {
    validateCreateProject,
    validateUpdateProject
};
