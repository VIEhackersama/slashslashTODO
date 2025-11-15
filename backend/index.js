require('dotenv').config(); 
const mongoose = require('mongoose');

require('./models/user.model');
require('./models/project.model');
require('./models/todo.model');
require('./models/todohistory.model');

const MONGO_URI = process.env.MONGO_URI; 

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Kết nối MongoDB thành công!');
    })
    .catch(err => {
        console.error('Lỗi kết nối MongoDB:', err);
    });