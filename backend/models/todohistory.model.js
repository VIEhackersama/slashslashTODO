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
        default: null 
    },
    action: {
        type: String,
        required: true,
    },
    details: {
        type: String, 
        default: null
    }
}, {
    timestamps: { createdAt: 'timestamp', updatedAt: false } 
});

todoHistorySchema.index({ todo_id: 1 });

module.exports = mongoose.model('TodoHistory', todoHistorySchema);