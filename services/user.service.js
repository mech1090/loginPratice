const userModel = require('../model/user')

const find = async(fields)=>{
    const findEmail = userModel.findOne(fields)
    return findEmail
}

const create = async(fields)=>{
    const createFields =  userModel.create(fields)
    return createFields
}

module.exports = {find,create}