/* Require Dependencies */
const express = require('express');
const notes = require('./data/notes');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes.js');

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

/* All notes */
app.get("/api/notes", (req, res) => {
    res.json(notes);
});

/* Note by Id */
app.get("/api/notes/:id", (req, res) => {
    const id = req.params.id;
    const note = notes.find(note => note._id === id);
    if (note) {
        res.json(note);
    } else {
        res.status(404).json({ message: "Note not found" });
    }
});

app.use('/api/users', userRoutes);

/* Server Listener */
app.listen(PORT, () => console.log('Server started on port ' + PORT));