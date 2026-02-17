const express = require("express")
const ownerRouter = express.Router()
const ownerController = require("../controllers/ownerController.js")
const protect = require("../middleware/auth.js")
const upload = require("../middleware/multer.js")

ownerRouter.post("/change-role",protect,ownerController.changeRoleToOwner)
ownerRouter.post("/add-car",upload.single("image"),protect,ownerController.addCar)
ownerRouter.get("/cars",protect,ownerController.getOwnerCars)
ownerRouter.post("/toggle-car",protect,ownerController.toggleCarAvailability)
ownerRouter.post("/delete-car",protect,ownerController.deleteCar)
ownerRouter.post('/update-image',upload.single("image"),protect,ownerController.updateImage)

ownerRouter.get('/dashboard',protect,ownerController.getDashboardData)


module.exports = ownerRouter