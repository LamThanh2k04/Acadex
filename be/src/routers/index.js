import express from "express"
import authRouter from "./auth/authRouter.js"
import adminRouter from "./admin/adminRouter.js"
const router = express.Router()

router.use("/api/auth",authRouter)
router.use("/api/admin",adminRouter)


export default router