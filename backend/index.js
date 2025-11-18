require('dotenv').config();
const connectDB = require('./services/dbconnect.service');
const app = require('./app');
const cookieParser = require('cookie-parser');
connectDB();
app.use(cookieParser());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`);
});
