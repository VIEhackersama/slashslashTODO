const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    owner_user_id: {
        type: Schema.Types.ObjectId, // Kiểu dữ liệu tham chiếu
        ref: 'User', // "Constraint" tham chiếu đến model 'User'
        required: true
    },
    name: {
        type: String,
        required: [true, 'Tên dự án là bắt buộc'],
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