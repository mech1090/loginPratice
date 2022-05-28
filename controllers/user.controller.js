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
    //const findEmail = await userModel.findOne({email})
    if(!findEmail){return res.render('signup/layout',{message:"Email not Registered Signup"})}
    const matchPassword = await bcrypt.compare(password,findEmail.password)
    if(matchPassword){
        return res.render('login/layout',{message:'Login Successful'})
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

module.exports = {getLoginForm,login,getSignupForm,signup}