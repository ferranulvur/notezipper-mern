/* Require Dependencies */
const express = require('express');
const notes = require('./data/notes');
const dotenv = require('dotenv');

/* Initialize Dependencies */
const app = express();
dotenv.config();

/* Declare Environment Variables */
const PORT = process.env.PORT || 6000;

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

/* Server Listener */
app.listen(PORT, () => console.log('Server started on port ' + PORT));