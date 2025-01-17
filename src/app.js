const express = require('express');
const { adminAuth, userAuth } = require('../middlewares/auth');
const app = express();

// Handle Auth Middleware for all GET , POST,......requests
app.use("/admin", adminAuth);
app.use("/user", userAuth);

app.use("/user/login",(req,res)=>{
    res.send("User is logged in successfully");
});

app.use("/user/data", userAuth,(req,res)=>{
    res.send("User data sent");
});




app.get("/admin/getAllData", (req, res) => {
    res.send("All Data is sent");
});

app.get("/admin/deleteData", (req, res) => {
    res.send("Data is deleted");
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});