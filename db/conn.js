const mongoose = require('mongoose');

const DB = process.env.DATABASE;


mongoose.connect(DB).then(() => {
    console.log('MongoDB connection is Successful');
})

    .catch((err) => {
        console.log('MongoDB Connection is Rejected')
    })