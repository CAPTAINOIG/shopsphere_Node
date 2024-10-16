const mongoose = require('mongoose');


const newsSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    date: {type: String, default: () => new Date().toLocaleDateString()},
    time: {type: String, default: () => new Date().toLocaleTimeString()},
})

const Newsletter = mongoose.model('Newsletter', newsSchema)
module.exports = Newsletter;