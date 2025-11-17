const express = require('express');
const router = express.Router({ mergeParams: true });
const auth = require('../middlewares/auth.middleware');
const { validateCreateTodo, validateUpdateTodo } = require('../validators/todo.validator');
const todoService = require('../services/todo.service');

// ---------------------------------------------
// CREATE TODO for specific project
// POST /api/projects/:projectId/todos
// ---------------------------------------------
router.post(
    '/',
    auth,
    validateCreateTodo,
    async (req, res) => {
        try {
            const todo = await todoService.createTodo(
                req.params.projectId,
                req.body,
                req.user.id
            );

            res.status(201).json({
                status: 'success',
                data: todo
            });
        } catch (err) {
            res.status(400).json({ status: 'error', message: err.message });
        }
    }
);

// ---------------------------------------------
// GET ALL TODOS
// GET /api/projects/:projectId/todos
// ---------------------------------------------
router.get(
    '/',
    auth,
    async (req, res) => {
        try {
            const todos = await todoService.getTodos(
                req.params.projectId,
                req.user.id
            );

            res.status(200).json({ status: 'success', data: todos });

        } catch (err) {
            res.status(400).json({ status: 'error', message: err.message });
        }
    }
);

// ---------------------------------------------
// GET SPECIFIC TODO
// GET /api/projects/:projectId/todos/:id
// ---------------------------------------------
router.get(
    '/:id',
    auth,
    async (req, res) => {
        try {
            const todo = await todoService.getSingleTodo(
                req.params.projectId,
                req.params.id,
                req.user.id
            );

            res.status(200).json({ status: 'success', data: todo });

        } catch (err) {
            res.status(404).json({ status: 'error', message: err.message });
        }
    }
);

// ---------------------------------------------
// UPDATE TODO
// PUT /api/projects/:projectId/todos/:id
// ---------------------------------------------
router.put(
    '/:id',
    auth,
    validateUpdateTodo,
    async (req, res) => {
        try {
            const updated = await todoService.updateTodo(
                req.params.projectId,
                req.params.id,
                req.body,
                req.user.id
            );

            res.status(200).json({
                status: 'success',
                message: 'Todo updated successfully',
                data: updated
            });

        } catch (err) {
            res.status(400).json({ status: 'error', message: err.message });
        }
    }
);

// ---------------------------------------------
// DELETE TODO
// DELETE /api/projects/:projectId/todos/:id
// ---------------------------------------------
router.delete(
    '/:id',
    auth,
    async (req, res) => {
        try {
            await todoService.deleteTodo(
                req.params.projectId,
                req.params.id,
                req.user.id
            );

            res.status(200).json({
                status: 'success',
                message: 'Todo deleted successfully'
            });

        } catch (err) {
            res.status(400).json({ status: 'error', message: err.message });
        }
    }
);

module.exports = router;
