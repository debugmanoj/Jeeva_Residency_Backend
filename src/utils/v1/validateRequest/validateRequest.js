export const validateRequest = (requiredFields, body) => {
  const missingFields = [];

  requiredFields.forEach((field) => {
    if (!body[field]) {
      missingFields.push(field);
    }
  });

  if (missingFields.length > 0) {
    return {
      valid: false,
      message: `Missing required field(s): ${missingFields.join(", ")}`
    };
  }

  return { valid: true };
};

export default {validateRequest};