import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = `${process.env.DB_URL}/${process.env.DB_NAME}`;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the DB_URL and DB_NAME environment variables in .env"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

if (!cached.conn) {
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }
  cached.conn = await cached.promise;
}

export default mongoose;
