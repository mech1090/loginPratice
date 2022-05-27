const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')


router.get('/',userController.getLoginForm)
router.post('/',userController.login)
router.get('/',userController.getSignupForm)
router.post('/',userController.signup)



module.exports = router