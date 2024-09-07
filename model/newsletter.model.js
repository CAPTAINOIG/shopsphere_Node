const mongoose = require('mongoose');


const newsSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    createdAt: { type: Date, default: Date.now }
})

const Newsletter = mongoose.model('Newsletter', newsSchema)
module.exports = Newsletter;