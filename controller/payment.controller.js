const express = require ('express');
const Payment = require('../model/payment.model')
const dotenv = require ('dotenv');
const mongoose = require ('mongoose');




const paymentGateway = (req, res) =>{
    // const form = new Payment (req.body);
    const {country, city, email, fullname, phone, phoneNumber, pickupname, pickupmail, pickupstation, shippingmethod, usermail, amount, userfirstname, userlastname, userphone, transactionReference, zip, } = req.body

    const userPayment = new Payment({
        country, city, email, fullname, phone, phoneNumber, pickupname, pickupmail,
        pickupstation, shippingmethod, usermail, amount, userfirstname, userlastname,
        userphone, transactionReference, zip
      });

    console.log(userPayment);
    userPayment.save()

    .then((response)=>{
        res.status(200).json({status:true, message: 'payment successful!', response})
    })
    .catch((err)=>{
        res.status(400).json({status:false, message:'payment not sucessful!'})
    })

}

module.exports = {paymentGateway};