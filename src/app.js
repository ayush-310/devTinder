const express = require('express');
const app = express();

// error Handling 7

app.use("/",(err,req,resizeBy,next)=>{

    if(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }
})



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});