const express = require('express');
const authRouter = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { validateSignUpData } = require('../utils/validation');

// SignUp API - POST /signup - register the user
authRouter.post("/signup", async (req, res) => {
    try {
        // Validating the data
        validateSignUpData(req);

        // Encrypt the password
        const { firstName, lastName, emailId, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        // Creating a new Instance of the User Model 
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: hashedPassword,
        });

        await user.save();
        res.send('User added successfully');
    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
})

// Login API - POST /login - login the user
authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        //    check if email exist in database
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid Credentials");
        }

        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {
            // Create a JWT Token
            const token = await user.getJWT();

            // Add the token to cookie and send the response back to the user
            res.cookie("token", token, {
                expires: new Date(Date.now() + 604800000),
            })
            res.send("Login Succesfully");
        } else {
            throw new Error("Invalid Credentials");
        }


    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
})

module.exports = authRouter;