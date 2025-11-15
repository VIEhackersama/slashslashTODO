const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.route');
const adminRoutes = require('./routes/admin.route');

const app = express();

// URL LIST
const allowedOrigins = [
    'http://localhost:5173', 
    'http://localhost:3001', 
    'https://your-frontend-domain.com'
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('Không được phép truy cập từ domain này!'));
        }
    },
    credentials: true, 
    optionsSuccessStatus: 200
}));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

app.use((req, res) => {
    res.status(404).json({ status: 'error', message: 'Endpoint không tồn tại' });
});

module.exports = app;
