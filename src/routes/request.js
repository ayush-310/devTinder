const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../middlewares/auth');

// useAuth : user logged in 
requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    try {
        const user = req.user;

        // Sending a connection request
        console.log("Connection request sent successfully");
        res.send(user.firstName + "Connection request sent successfully");

    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
})

module.exports = requestRouter;