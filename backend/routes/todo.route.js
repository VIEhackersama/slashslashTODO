const express = require('express');
const router = express.Router({ mergeParams: true });
const auth = require('../middlewares/auth.middleware');
const { validateCreateTodo, validateUpdateTodo } = require('../validators/todo.validator');
const todoService = require('../services/todo.service');


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
