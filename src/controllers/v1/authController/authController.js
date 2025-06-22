import bcrypt from 'bcrypt'
import User from "../../../models/v1/userSchema.js";
import {validateRequest} from '../../../utils/v1/validateRequest/validateRequest.js';
import { sendError,sendSuccess } from '../../../utils/v1/responseHandler/responseHandler.js';

const checkCredential = async (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  const { valid, message } = validateRequest(['email', 'password'], req.body);
 if (!valid) return sendError(res, message, 400);

  try {
    const user = await User.findOne({ email });

if (!user) return sendError(res, "User not found", 404);

    const isMatch = await bcrypt.compare(password, user.password);

 if (!isMatch) return sendError(res, "Invalid credentials", 401);

    // TODO: Generate and return JWT if needed

 return sendSuccess(res, "Login successful", {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
 return sendError(res);
  }
};




export default {
    checkCredential,
};