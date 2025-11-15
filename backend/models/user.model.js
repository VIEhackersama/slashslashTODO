const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username là bắt buộc'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email là bắt buộc'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password_hash: {
        type: String,
        required: [true, 'Mật khẩu là bắt buộc']
    },
    full_name: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        unique: true,
        sparse: true, 
        match: [/^\+?[0-9]{8,15}$/, 'Số điện thoại không hợp lệ'] 
    },
    profile_picture: {
        type: String,
        default: null, 
        trim: true
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    // Chỉ hash nếu password mới được sửa hoặc thêm
    if (!this.isModified('password_hash')) return next();

    try {
        const salt = await bcrypt.genSalt(10); 
        this.password_hash = await bcrypt.hash(this.password_hash, salt); // hash mật khẩu
        next();
    } catch (err) {
        next(err);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password_hash);
};//check mk

// Biên dịch Schema thành Model
module.exports = mongoose.model('User', userSchema);