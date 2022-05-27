const userModel = require('../model/user')
const bcrypt = require('bcrypt')
const config = require('config')

const getLoginForm = (req,res)=>{
    res.render('login/layout')
}
const login = async(req,res)=>{
    const {email,password} = req.body
    const userFind = await userModel.find({email})
    console.log(userFind)
    if(!userFind){
        return res.render('login/layout',{message:'Email not Found'})
    }
    res.render('./login/layout')
    
}
const getSignupForm = (req,res)=>{
    res.render('./signup/layout')
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