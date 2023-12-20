const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

app.use(cors(
    {
        origin:"https://divyanshuverma.netlify.app",
        methods:["GET", "POST"],
        credentials: true
    }
));
app.use(cookieParser());
dotenv.config({path:'./config.env'});
require('./db/conn');

app.use(express.json());

const User = require('./model/userSchema');

// Now we are linking our Router Routes below

app.use(require('./routers/auth'));

// const DB = 'mongodb+srv://divyanshu:divyanshudb@cluster0.piuvopq.mongodb.net/merndata?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000;



// Middleware for checking authorization
// const middleware = (req, res, next) => {
//     console.log(`Hello! I'm Middleware for checking Authorization...`);
//     next();
// };

// app.get("/", (req, res) => {
//     res.send("Hello From Div Mern Project Mern Means: MonogDB, Express, React, and Node");
// });

// Using the middleware in the /aboutme route

// app.get("/aboutme", (req, res) => {
//     res.send("Hello About me page, here we will fetch the data from Database");
// });

app.get("/registration", (req, res) => {
    res.send("Hello Registration Page");
});

// app.get("/contactus", (req, res) => {
//     res.send("Hello Contact Us Page");
// });

app.get("/signin", (req, res) => {
    res.send("Hello Login Page");
});

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
