const express = require("express")
const userRouter = express.Router()
const {registerUser,loginUser, getUserData}  = require('../controllers/userController.js')
const protect = require("../middleware/auth.js")


userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/data',protect,getUserData)



module.exports = userRouter