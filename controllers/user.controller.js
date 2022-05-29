const userModel = require('../model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('config')
const userService = require('../services/user.service')



const getLoginForm = (req,res)=>{
    res.render('login/layout')
}
const login = async(req,res)=>{
    const {email,password} = req.body
    const fields = {email,password}
    const findEmail = await userService.find({email})
    if(!findEmail){return res.render('signup/layout',{message:"Email not Registered Signup"})}
    const isAuthorized = await bcrypt.compare(password,findEmail.password)
    if(isAuthorized){
     //   const token = jwt.sign({_id:findEmail._id},config.get('jwtKey.jwtPrivateKey'))
        const token = userModel.getAuthToken()
        return res.header({'x-auth-token':token}).render('user/layout',{message:'Login Successful'})
    }
    return res.render('login/layout',{message:'Login Failed'})
}


const getSignupForm = (req,res)=>{
    res.render('signup/layout')
}
const signup =async (req,res)=>{
    const {email,password} = req.body
    const hashedPassword = await bcrypt.hash(password,config.get('hashedPassword.salt'))
    const userFields = {email,password:hashedPassword}
    const findEmail = await userService.find({email})
    if(findEmail){
        return res.render('login/layout',{message:'User already Registered'})
    }
    const createUser = await userService.create(userFields)
    return res.render('login/layout',{message:'User Created'})

}
const userList = async (req,res)=>{

}

module.exports = {getLoginForm,login,getSignupForm,signup,userList}