const express = require('express')
const router = express.Router()

const {signup,login,logout,allUsers, deleteAccount, updateDisplayPicture, updateProfile, sendOTP } = require('../controller/user')

// const {secureRoute} = require('../middleware/secureRoute')
const { resetPasswordToken, resetPassword } = require('../controller/ResetPassword')
router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.get('/allusers' ,allUsers)
router.post('/resetPasswordToken', resetPasswordToken)
router.post('/reset-password', resetPassword)
router.post('/deleteAccount',deleteAccount)
router.put('/updateDisplayPicture',updateDisplayPicture)
router.put('/updateProfile',updateProfile)



module.exports = router;