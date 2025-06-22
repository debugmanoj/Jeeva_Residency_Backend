import express from "express";
import customerController from "../../../controllers/v1/customerController/customerController.js";
import upload from "../../../middlewares/v1/uploadMiddleware.js/uploadMiddleware.js";

const router = express.Router();

// Use upload.fields for multiple images
router.post(
  "/createCustomer",
  upload.fields([
    { name: "idProof", maxCount: 1 },
    { name: "visa", maxCount: 1 }, // Optional
  ]),
  customerController.createCustomer
);





export default router;