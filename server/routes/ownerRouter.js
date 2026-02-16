const express = require("express")
const ownerRouter = express.Router()
const ownerController = require("../controllers/ownerController.js")
const protect = require("../middleware/auth.js")
const upload = require("../middleware/multer.js")

ownerRouter.post("/change-role",protect,ownerController.changeRoleToOwner)
ownerRouter.post("/add-car",upload.single("image"),protect,ownerController.addCar)


module.exports = ownerRouter