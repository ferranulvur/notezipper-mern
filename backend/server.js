/* Require Dependencies */
const express = require('express');
const notes = require('./data/notes');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound, errorHandler} = require('./middlewares/errorMiddleware');
const userRoutes = require('./routes/userRoutes.js');
const noteRoutes = require('./routes/noteRoutes.js');

/* Initialize Dependencies */
const app = express();
app.use(express.json());

dotenv.config();
connectDB(process.env.MONGO_URI);

/* Declare Environment Variables */
const PORT = process.env.PORT;

/* Get Routes*/

/* Index */
app.get('/', (req, res) => {
    res.send('API Running!');
});

app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

/* Server Listener */
app.listen(PORT, () => console.log('Server started on port ' + PORT));