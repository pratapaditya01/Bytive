const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email:String,
    password:String,
    gravatar: String,
    techStack: [String],
    location: String,
    fieldOfInterest: [String],
    seeking: [String],
    bio: String,
    githubURL: String,
    twitterURL: String,
    websiteURL: String,
    linkedinURL: String
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
