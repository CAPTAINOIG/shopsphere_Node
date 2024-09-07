const express = require('express');
const router = express.Router()

const {register, userLogin, password, resetPassword, getDashboard, newsletter} = require('../controller/user.controller')

router.post('/signup', register);
router.post('/login', userLogin);
router.post('/forgotPassword', password);
router.post('/resetPassword', resetPassword);
router.post('/news', newsletter);




router.get('/dashboard', getDashboard)

module.exports = router;