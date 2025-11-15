const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoHistorySchema = new Schema({
    todo_id: {
        type: Schema.Types.ObjectId,
        ref: 'Todo',
        required: true
    },
    actor_user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null // Null có thể là 'hệ thống'
    },
    action: {
        type: String,
        required: true,
        // Ví dụ: 'created', 'status_changed', 'assigned', 'content_changed'
    },
    details: {
        type: String, // Ví dụ: "Changed status from 'open' to 'resolved'"
        default: null
    }
}, {
    timestamps: { createdAt: 'timestamp', updatedAt: false } // Chỉ cần 'createdAt'
});

// Index để tra lịch sử của 1 todo
todoHistorySchema.index({ todo_id: 1 });

module.exports = mongoose.model('TodoHistory', todoHistorySchema);