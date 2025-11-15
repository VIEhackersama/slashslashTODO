const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI;
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to DB successfully');
    } catch (err) {
        console.error('Error occured:', err.message);
        process.exit(1); // Dừng app nếu không kết nối được
    }
};

module.exports = connectDB;
