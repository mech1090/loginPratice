const userModel = require('../model/user')

const find = async(fields)=>{
    const findEmail = modelUser.findOne(fields)
    return findEmail
}

module.exports = {find}