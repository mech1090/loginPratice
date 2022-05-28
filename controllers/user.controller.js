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
    const findUser = await userService.find({email})
    const matchPassword = await bcrypt.compare(password,findUser.password)
    console.log(matchPassword)
    if(matchPassword){
        return res.render('login/layout',{message:'login successfull'})
    }
    return res.render('login/layout',{message:'Email or Password Wrong'})

}


const getSignupForm = (req,res)=>{
    res.render('signup/layout')
}
const signup =async (req,res)=>{
    const {email,password} = req.body
    const userFields = {email,password}
    const hashedPassword = await bcrypt.hash(password,config.get('hashedPassword.salt'))
    console.log(hashedPassword)
    const findEmail = await userModel.findOne({email})
    if(findEmail){
        return res.render('login/layout',{message:'User already Registered'})
    }
    const createUser = await userModel.create({email,password:hashedPassword})
    return res.render('signup/layout',{message:'User Created'})

}

module.exports = {getLoginForm,login,getSignupForm,signup}