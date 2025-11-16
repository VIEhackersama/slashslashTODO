const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    owner_user_id: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    name: {
        type: String,
        required: [true, 'Project name is needed'],
        trim: true
    },
    repository_url: {
        type: String,
        trim: true
    },
    last_scanned_at: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);