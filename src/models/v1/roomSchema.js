import mongoose from "../../config/v1/mongoose.js";

const roomSchema = new mongoose.Schema(
  {
    roomNo: {
      type: String,
      required: true,
    },
    bedType: {
      type: String,
      required: true,
    },
    floor: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['Available', 'Occupied', 'OverDue'],
      default: 'admin'
    },
    bookedCustomer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer", // Reference to a Customer model
      default: null,
    },
    bookingDates: {
      checkIn: Date,
      checkOut: Date,
    },
  },
  {
    timestamps: true
  }
);

const Room = mongoose.model('rooms', roomSchema);

export default Room;