const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.route');
const adminRoutes = require('./routes/admin.route');
const projectRoutes = require('./routes/project.route');
const todoRoutes = require('./routes/todo.route');
const chatRoutes = require('./routes/chat.route');

const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3001',
    'http://localhost:3000',    
    'http://172.20.10.3:3001',   
    'http://172.20.10.3:5173',
    'http://192.168.40.1:3001',   
    'https://your-frontend-domain.com'
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('Domain unauthorized!'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.json());

// ROUTES
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/projects/:projectId/todos', todoRoutes);

// CHATBOT ROUTE
app.use('/api/chat', chatRoutes);

// 404
app.use((req, res) => {
    res.status(404).json({ status: 'error', message: 'Endpoint not found' });
});

module.exports = app;
