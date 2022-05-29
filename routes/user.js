const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')


router.get('/login',userController.getLoginForm)
router.post('/login',userController.login)
router.get('/signup',userController.getSignupForm)
router.post('/signup',userController.signup)
router.get('/list',userController.userList)



module.exports = router