const dotenv = require ('dotenv');
dotenv.config();
const mongoose = require ('mongoose');


const URI = process.env.URI

mongoose.connect(URI)
    .then(()=>{
        console.log('mongoose connected successfully')
    })
    .catch((err)=>{
        console.log(err); 
    })
