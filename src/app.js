const express = require('express');

const app = express();

//This will only handle GET call to /user
app.get("/user", (req, res) => {
    res.send({ firstName: 'John', lastName: 'Doe' });
})

// Dynamic Route 
app.get("/user/:userId/:name/:password", (req, res) => {
    console.log(req.params);
    res.send({ firstName: 'Ayush', lastName: 'Srivastava' });
})

app.post("/user", (req, res) => {
    res.send('User saved');
})

app.delete("/user", (req, res) => {
    res.send('User deleted');
})  

// THis will match all the HTTP method API calls to /test
app.use("/test", (req, res) => {
    res.send('Hello World');
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});