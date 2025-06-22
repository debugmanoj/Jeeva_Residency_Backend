import Customer from "../../../models/v1/customerSchema.js"
import Room from "../../../models/v1/roomSchema.js"
import { sendError,sendSuccess } from "../../../utils/v1/responseHandler/responseHandler.js";
import {validateRequest} from '../../../utils/v1/validateRequest/validateRequest.js';

const createCustomer = async (req, res) => {
  const {
    name,
    mobileNumber,
    nationality,
    idProofType,
    checkIn,
    checkOut,
    roomId,
    visaExpiry,
  } = req.body;


  const { valid, message } = validateRequest(
    [
      "name",
      "mobileNumber",
      "nationality",
      "idProofType",
      "checkIn",
      "checkOut",
      "roomId",
    ],
    req.body
  );

  if (!valid) return sendError(res, message, 400);

  try {
    const idProofFile = req.files?.idProof?.[0];
    const visaFile = req.files?.visa?.[0];

 if (!idProofFile) return sendError(res, "ID proof is required", 400);

 if (nationality === "Foreigner" && (!visaFile || !visaExpiry))
      return sendError(res, "Visa file and expiry date required for foreigners", 400);

    const room = await Room.findById(roomId);
    if (!room) return sendError(res, "Room not found", 404);

if (room.status !== "Available") return sendError(res, "Room is not available", 400);

    const newCustomer = await Customer.create({
      name,
      mobileNumber,
      nationality,
      idProofType,
      idProofUrl: idProofFile.path,
      visaUrl: visaFile?.path || null,
      visaExpiry: visaExpiry || null,
      checkIn,
      checkOut,
      room: roomId,
      paymentDetails: {
        rentCost: req.body.rentCost,
        discount: req.body.discount || 0,
        paid: req.body.paid,
        balance: req.body.balance,
        paymentType: req.body.paymentType,
      },
    });

    room.status = "Occupied";
    room.bookedCustomer = newCustomer._id;
    room.bookingDates = { checkIn, checkOut };
    await room.save();

   return sendSuccess(res, "Customer created", newCustomer, 201);
  } catch (err) {
    console.log('err: ', err)
   return sendError(res, "Internal server error");
  }
};




export default {
    createCustomer,
};