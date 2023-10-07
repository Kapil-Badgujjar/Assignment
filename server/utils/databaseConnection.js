const mongoose = require('mongoose');
module.exports = async function connectToDatabase(){
    mongoose.connect(process.env.MONGODB_SECRET_KEY).then(() => console.log('Connected database'));
}