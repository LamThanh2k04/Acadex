import express from "express"
import { adminController } from "../../controllers/admin/adminController.js"
const router = express.Router()

router.post("/createFaculty",adminController.createFaculty)
router.post("/createMajor",adminController.createMajor)
router.post("/createClass",adminController.createClass)
router.post("/createStudent",adminController.createStudent)
export default router