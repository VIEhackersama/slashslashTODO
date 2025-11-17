const Todo = require('../models/todo.model');
const Project = require('../models/project.model');

class TodoService {

    async createTodo(projectId, data, userId) {
        const project = await Project.findById(projectId);
        if (!project) throw new Error("Project not found");

        if (project.owner_user_id.toString() !== userId)
            throw new Error("Not allowed to create todo in this project");

        data.project_id = projectId;

        return await Todo.create(data);
    }

    async getTodos(projectId, userId) {
        const project = await Project.findById(projectId);
        if (!project) throw new Error("Project not found");

        if (project.owner_user_id.toString() !== userId)
            throw new Error("Not allowed to view todos from this project");

        return await Todo.find({ project_id: projectId });
    }

    async getSingleTodo(projectId, todoId, userId) {
        const project = await Project.findById(projectId);
        if (!project) throw new Error("Project not found");

        if (project.owner_user_id.toString() !== userId)
            throw new Error("Not allowed");

        const todo = await Todo.findOne({ _id: todoId, project_id: projectId });
        if (!todo) throw new Error("Todo not found");

        return todo;
    }

    async updateTodo(projectId, todoId, data, userId) {
        const project = await Project.findById(projectId);
        if (!project) throw new Error("Project not found");

        if (project.owner_user_id.toString() !== userId)
            throw new Error("Not allowed");

        const updated = await Todo.findOneAndUpdate(
            { _id: todoId, project_id: projectId },
            data,
            { new: true, runValidators: true }
        );

        if (!updated) throw new Error("Todo not found");

        return updated;
    }

    async deleteTodo(projectId, todoId, userId) {
        const project = await Project.findById(projectId);
        if (!project) throw new Error("Project not found");

        if (project.owner_user_id.toString() !== userId)
            throw new Error("Not allowed");

        const deleted = await Todo.findOneAndDelete({
            _id: todoId,
            project_id: projectId
        });

        if (!deleted) throw new Error("Todo not found");

        return true;
    }
}

module.exports = new TodoService();
