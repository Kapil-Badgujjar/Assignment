const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_SECRET_KEY);
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required:true },
    password: { type: String, required:true }
});
module.exports = UserModel = mongoose.models.User || new mongoose.model('User',userSchema);