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

const validateCreateTodo = [
    body('project_id')
        .notEmpty().withMessage('project_id is required')
        .isMongoId().withMessage('Invalid project_id'),

    body('file_path')
        .notEmpty().withMessage('file_path is required'),

    body('line_number')
        .notEmpty().withMessage('line_number is required')
        .isInt({ min: 1 }).withMessage('line_number must be >= 1'),

    body('content')
        .notEmpty().withMessage('content is required'),

    body('status')
        .optional()
        .isIn(['open', 'resolved', 'ignored']).withMessage('Invalid status'),

    body('priority')
        .optional()
        .isIn(['low', 'medium', 'high', null]).withMessage('Invalid priority'),

    body('context.snippet')
        .optional()
        .isString().withMessage('context.snippet must be a string'),

    handleValidation
];

const validateUpdateTodo = [
    body('file_path').optional(),
    body('line_number')
        .optional()
        .isInt({ min: 1 }).withMessage('line_number must be >= 1'),
    body('content').optional(),
    body('status')
        .optional()
        .isIn(['open', 'resolved', 'ignored']).withMessage('Invalid status'),
    body('priority')
        .optional()
        .isIn(['low', 'medium', 'high', null]).withMessage('Invalid priority'),
    body('context.snippet')
        .optional()
        .isString().withMessage('context.snippet must be a string'),

    handleValidation
];

module.exports = {
    validateCreateTodo,
    validateUpdateTodo
};
