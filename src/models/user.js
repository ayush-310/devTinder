const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 18,

    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not Valid")
            }
        },
    },
    photoUrl: {
        type: String,
        default: "https://www.shutterstock.com/image-vector/vector-design-avatar-dummy-sign-600nw-1290556063.jpg",
    },
    about: {
        type: String,
        default: "This is my bio",
    },
    skills: {
        type: [String],
    },
}, {
    timestamps: true,
}
)

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;

