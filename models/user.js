const mongoose = require('mongoose');
const pasportLocalMongoose = require('passport-local-mongoose');
var userSchema = new mongoose.Schema({
    username: String,
    password: String
});
userSchema.plugin(pasportLocalMongoose);
module.exports = mongoose.model('User', userSchema);