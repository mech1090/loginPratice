const userModel = require('../model/user')

const find = async(fields)=>{
    const findField =  userModel.findOne(fields)
    return findField
}

module.exports = {find}