const express = require('express');
const router = express.Router()
const verifyToken = require('../middleware/verifyToken');


const {register, userLogin, password, resetPassword, getDashboard, newsletter} = require('../controller/user.controller')

router.post('/signup', register);
router.post('/login', userLogin);
router.post('/forgotPassword', password);
router.post('/reset', resetPassword);
router.post('/news', newsletter);




router.get('/dashboard', verifyToken, getDashboard);

module.exports = router;