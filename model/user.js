const { default: mongoose } = require("mongoose");

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

module.exports = User