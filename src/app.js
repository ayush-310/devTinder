const express = require('express');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');
const { validateSignUpData } = require('./utils/validation');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { userAuth } = require('./middlewares/auth');

// Read JSON data from the request body
app.use(express.json());

// Read cookie from the request body
app.use(cookieParser());



app.post("/signup", async (req, res) => {
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
app.post("/login", async (req, res) => {
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


app.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    }
    catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
})

// useAuth : user logged in 
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
    try {
        const user = req.user;

        // Sending a connection request
        console.log("Connection request sent successfully");
        res.send(user.firstName + "Connection request sent successfully");

    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
})

connectDB().then(() => {
    console.log("Database connected");

    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch((err) => {
    console.error("Database connection failed", err);
})




