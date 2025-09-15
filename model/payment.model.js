const mongoose = require('mongoose');


const paymentSchema = new mongoose.Schema({

    country: {type: String},

    city: {type: String},
    
    email: { type: String },
    
    fullname: { type: String },
    
    phone: { type: String },
    
    phoneNumber: { type: String },
    
    pickupmail: { type: String },
    
    pickupname: { type: String },
    
    pickupstation: { type: String },
    
    shippingmethod: { type: String },
    
    useremail: { type: String },
    
    amount: { type: String },

    userfirstname: { type: String },

    userlastname: { type: String },

    userphone: { type: String },

    zip: { type: String },

    transactionReference: { type: String },

    paymentDate: {type: Date, default: Date.now()},

    date: {type: String, default: () => new Date().toLocaleDateString()},

    time: {type: String, default: () => new Date().toLocaleTimeString()},
});

const Payment = mongoose.model('Payment', paymentSchema)

module.exports = Payment;