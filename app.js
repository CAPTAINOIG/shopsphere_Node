const express = require ('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
const dotenv = require ('dotenv');
const mongoose = require ('mongoose');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


require('./connection/mongoose.connection');

const productRoutes = require('./routes/product.route');
const newsLetter = require('./routes/subscription.route');
const user = require('./routes/user.route');
const cart = require('./routes/cart.route');


app.use('/', productRoutes); 
app.use('/', newsLetter)
app.use('/', user);
app.use('/', cart);

// app.use('/api', (req, res) =>{
//     res.send('hello')
//     console.log('you are welcome');  
// })

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
})