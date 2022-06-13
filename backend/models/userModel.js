const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false,
            required: true
        },
        pic: {
            type: String,
            required: true,
            default: 'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png'
        }
    },
    {
        timestamps: true  
    }  
);

userSchema.pre('save', async function(next) {

    if(!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
});

userSchema.methods.isValidPassword = async function(newPassword) {
    return await bcrypt.compare(newPassword, this.password);
}

const User = mongoose.model('User', userSchema);
module.exports = User;
