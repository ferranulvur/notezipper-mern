const asyncHandler = require("express-async-handler");
const Note = require('../models/noteModel');

const getNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find({ user: req.user._id});
    res.status(200).json({ message: 'Notes fetched successfully', notes });
});

const createNote = asyncHandler(async (req, res) => {

    const {title, content, category} = req.body;

    if (!title || !content || !category) {

        return res.status(400).json({ message: 'Please provide all required fields' });
    
    } else{

        const note = new Note({user: req.user._id, title, content, category})
        const createdNote = await note.save();
        res.status(201).json({ message: 'Note created successfully', createdNote });
    
    }

});

const getNoteById = asyncHandler(async (req, res) => {
    
        const note = await Note.findById(req.params.id);
        //const note = await Note.find({ user: req.user._id}).findById(req.params.id);
   
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json({ message: 'Note fetched successfully', note });


});

const updateNote = asyncHandler(async (req, res) => {

    try{

        const note = await Note.findById(req.params.id);
        const {title, content, category} = req.body;

        if(!title || !content || !category) return res.status(400).json({ message: 'Please provide all required fields' });
        if (note) {

            if (note.user.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Not authorized' });

            note.title = title;
            note.content = content;
            note.category = category;
            const updatedNote = await note.save();
            res.status(200).json({ message: 'Note updated successfully', updatedNote });
                
        } else return res.status(404).json({ message: 'Note not found' });     
    
    } catch(err){
        res.status(400).json({ message: 'Error updating note' });
    }
});

const deleteNote = asyncHandler(async (req, res) => {
    
        try{
    
            const note = await Note.findById(req.params.id);
            if (note) {
                if (note.user.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Not authorized' });
                await note.remove();
                res.status(200).json({ message: 'Note deleted successfully' });
            } else return res.status(404).json({ message: 'Note not found' });
        }
        catch(err){
            res.status(400).json({ message: 'Error deleting note' });
        }
});

module.exports = {getNotes, createNote, getNoteById, updateNote, deleteNote};