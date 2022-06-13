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

const authUser = asyncHandler(async (req,res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});

    try {
        if(!user) {
            res.status(400).json({message: 'User does not exist'})
        } else{
            const isValidPassword = await user.isValidPassword(password);
            if(isValidPassword) {
                res.status(200).json({message: 'User authenticated successfully', user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    pic: user.pic
                }})
            } else {
                res.status(400).json({message: 'Invalid password'})
            }
        }
    } catch(err){
        res.status(400).json({ message: err.message });
    }
})

module.exports = {registerUser, authUser};