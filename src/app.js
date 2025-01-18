const express = require('express');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');

app.use(express.json());

app.post("/signup", async (req, res) => {
    // Creating a new Instance of the User Model 
    const user = new User(req.body);

    try {
        await user.save();
        res.send('User added successfully');
    } catch (error) {
        res.status(400).send("Error while saving the user");
    }
})

// Get user by email 
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const users = await User.findOne({ emailId: userEmail });
        if (users.length === 0) {
            return res.status(404).send("User not found");
        } else {
            res.send(users);
        }
    } catch (error) {
        res.status(400).send("Error while fetching the user");
    }
})

// Feed API - GET /feed - get all the users from the database 
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(400).send("Error while fetching the feed");
    }
})

// Delete user by Id 
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;

    try {
        const user = await User.findByIdAndDelete({ _id: userId });

        res.send("User deleted successfully");

    } catch (error) {
        res.status(400).send("Error while fetching the user");
    }
})

// Update data of user
app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    console.log(data);
    try {
        const user = await User.findByIdAndUpdate(userId, data);
        res.send("User updated successfully");
    } catch (error) {
        res.status(400).send("Error while updating the user");
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




