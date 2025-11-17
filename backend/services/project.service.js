const Project = require('../models/project.model');

class ProjectService {

    async createProject(userId, data) {
        data.owner_user_id = userId;
        return await Project.create(data);
    }

    async getMyProjects(userId) {
        return await Project.find({ owner_user_id: userId });
    }

    async getProjectById(projectId, userId) {
        const project = await Project.findById(projectId);

        if (!project) throw new Error("Project not found");
        if (project.owner_user_id.toString() !== userId)
            throw new Error("Not authorized");

        return project;
    }

    async updateProject(projectId, userId, data) {
        const project = await this.getProjectById(projectId, userId);

        return await Project.findByIdAndUpdate(project._id, data, {
            new: true,
            runValidators: true
        });
    }

    async deleteProject(projectId, userId) {
        const project = await this.getProjectById(projectId, userId);
        await Project.findByIdAndDelete(project._id);
        return true;
    }
}

module.exports = new ProjectService();
