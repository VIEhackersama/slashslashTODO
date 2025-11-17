const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth.middleware');
const projectService = require('../services/project.service');

router.post('/', auth, async (req, res) => {
    try {
        const project = await projectService.createProject(req.user.id, req.body);
        res.status(201).json({ status: 'success', data: project });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const projects = await projectService.getMyProjects(req.user.id);
        res.status(200).json({ status: 'success', data: projects });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const project = await projectService.getProjectById(req.params.id, req.user.id);
        res.status(200).json({ status: 'success', data: project });
    } catch (err) {
        res.status(404).json({ status: 'error', message: err.message });
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const updated = await projectService.updateProject(req.params.id, req.user.id, req.body);
        res.status(200).json({ status: 'success', data: updated });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        await projectService.deleteProject(req.params.id, req.user.id);
        res.status(200).json({ status: 'success', message: 'Project deleted' });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});

module.exports = router;
