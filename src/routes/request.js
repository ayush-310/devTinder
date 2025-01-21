const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest'); 
const User = require('../models/user');

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ['ignored', 'interested'];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json("Invalid status : " + status);
        }

        // User exists or not
        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(400).json({message :"User not found!"});
        }

        // If there is an existing ConnectionRequest 
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId }, // checks Ayush sent request to Akshay
                { fromUserId: toUserId, toUserId: fromUserId } // checks Akshay sent request to Ayush
            ]
        });

        if (existingConnectionRequest) {
            return res
                .status(400)
                .json("Connection Request already exist!");
        }



        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        const data = await connectionRequest.save();
        res.json({
            message: req.user.firstName + " is " + status + " in " + toUser.firstName,
            data
        });

    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
});

module.exports = requestRouter;
