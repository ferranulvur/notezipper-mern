const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');


const registerUser = asyncHandler(async (req,res) => {
    const { name, email, password, pic } = req.body;
    const userExists = await User.findOne({email});

    try {
        if(userExists) {
            res.status(400).json({message: 'User already exists'})
        } else{
            const newUser = await User.create({name, email, password, pic});
            res.status(201).json({message: 'User created successfully', user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                pic: newUser.pic
            }})
        }    
    } catch(err){
        res.status(400).json({ message: err.message });
    }
})

module.exports = {registerUser};