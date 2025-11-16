const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const todoContextSchema = new Schema({
    snippet: {
        type: String,
        required: true
    }
}, { _id: false }); 
const todoSchema = new Schema({
    project_id: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    assigned_to_user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null 
    },
    file_path: {
        type: String,
        required: true
    },
    line_number: {
        type: Number,
        required: true,
        min: 1 
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['open', 'resolved', 'ignored'],
        default: 'open'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', null],
        default: null
    },
    due_date: {
        type: Date,
        default: null
    },

    context: todoContextSchema,

    first_seen_at: {
        type: Date,
        default: Date.now
    },
    last_seen_at: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true 
});

todoSchema.index({ project_id: 1, status: 1 });

module.exports = mongoose.model('Todo', todoSchema);