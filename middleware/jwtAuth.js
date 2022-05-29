const jwt = require('jsonwebtoken')
const config = require('config')


const jwtAuth = (req,res,next)=>{
    return res.render('user/layout')
}

module.exports = {jwtAuth}