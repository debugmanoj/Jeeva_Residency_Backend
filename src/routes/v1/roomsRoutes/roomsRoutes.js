import express from "express";
import roomController from "../../../controllers/v1/roomController/roomController.js";

const router = express.Router();

router.get("/getRooms",roomController.getRoomsBasedOnScrollableCondition)
router.get("/getCheckInCheckOutCount",roomController.getCheckInCheckOutCount)
router.get("/getAvaialbeRoom",roomController.getAvailableRooms)





export default router;