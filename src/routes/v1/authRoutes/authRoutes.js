import express from "express";
import authController from "../../../controllers/v1/authController/authController.js";

const router = express.Router();
router.post("/checkUser",authController.checkCredential)





export default router;