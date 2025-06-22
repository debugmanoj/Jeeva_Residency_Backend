import express from "express"
import authRoutes from "./authRoutes/authRoutes.js"
import roomsRoutes from "./roomsRoutes/roomsRoutes.js"
import customerRoutes from "./customerRoutes/customerRoutes.js"

const router=express.Router();


//user Routing

router.use("/auth",authRoutes)
router.use("/room",roomsRoutes)
router.use("/customer",customerRoutes)


export default router