const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("Connected to DB");
        })
}


module.exports = connectDB