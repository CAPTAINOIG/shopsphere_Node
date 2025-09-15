const express = require('express');
const router = express.Router();

const  {newsletter} = require('../controller/user.controller');


router.post('/news', newsletter);
 
module.exports = router;