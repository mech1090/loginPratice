const { default: mongoose } = require("mongoose");
const jwt = require('jsonwebtoken')
const config = require('config')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},
{
    collection:'user login'
}
)


const User = mongoose.model('user',userSchema)
userSchema.methods.getAuthToken = function(){
    const token = jwt.sign({_id:this._id},config.get('jwtKey.jwtPrivateKey'))
    return token
}

module.exports = User