const express = require ('express');
const router = express.Router();

const {paymentGateway} = require ('../controller/payment.controller')

router.post('/gateway', paymentGateway)

module.exports = router;