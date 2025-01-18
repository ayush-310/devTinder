const mongoose = require('mongoose');
const validator = require('validator');


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
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid " + value);
            }
        },
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Enter a Strong Password " + value);
            }
        },
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
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid Photo URL " + value);
            }
        },
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

