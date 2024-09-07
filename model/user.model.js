const mongoose = require ('mongoose');


const userSchema =new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
})

let saltRounds = 10
userSchema.pre('save', function(next){
    console.log(this.password);
    bcrypt.hash(this.password, saltRounds)

.then((response) => {
    console.log(response);
    this.password = response
    next()
})
.catch(err =>{
    console.log(err);
})
})


userSchema.methods.validatePassword = function(password, callback){
    console.log(password);
    console.log(this);
    bcrypt.compare(password,this.password,(err,same)=>{
        console.log(same);
        if(!err){
            callback(err, same)
        }else{
            next()
        }
    })
}
const User = mongoose.model('User', userSchema);
module.exports = User;