const express = require('express');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');

app.use(express.json());

app.post("/signup", async (req, res) => {

    console.log(req.body);


    // Creating a new Instance of the User Model 
    const user = new User(req.body);
    
    // const user = new User({
    //     firstName: 'MS',
    //     lastName: 'Dhoni',
    //     email: "Dhoni@gmail.com",
    //     password: "1234dsdfgdfgdfgfsdf56",
    //     age: 42,
    //     gender: "Male"
    // });

    try {
        await user.save();
        res.send('User added successfully');
    } catch (error) {
        res.status(400).send("Error while saving the user");
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


