import mongoose from "../../config/v1/mongoose.js";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      match: /^[6-9]\d{9}$/, // Indian mobile number format (for validation)
    },
    nationality: {
      type: String,
  enum: ['Indian', 'Indians', 'Foreign','Foreigners'], // Add 'Indians' here if needed
      required: true,
    },
    idProofType: {
      type: String,
    //   enum: ["Aadhar", "Passport", "Driving License", "Other"],
      required: true,
    },
    idProofUrl: {
      type: String, // File upload (e.g., AWS S3, Cloudinary URL)
      required: true,
    },
    visaExpiry: {
      type: Date,
      default: null, // Optional for Indians
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rooms", // Reference back to the booked room
      required: true,
    },
    paymentDetails: {
      rentCost: {
        type: Number,
        required: true,
        min: 0,
      },
      discount: {
        type: Number,
        default: 0,
        min: 0,
      },
      paid: {
        type: Number,
        required: true,
        min: 0,
      },
      balance: {
        type: Number,
        required: true,
        min: 0,
      },
      paymentType: {
        type: String,
        enum: ["Online", "Cash"],
        required: true,
      },
      paymentStatus: {
        type: String,
        enum: ["Paid", "Partial", "Pending"],
        default: function () {
          return this.balance > 0
            ? this.paid > 0
              ? "Partial"
              : "Pending"
            : "Paid";
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
