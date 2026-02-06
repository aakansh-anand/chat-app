import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDb = async () => {
  try {
    if (!ENV.MONGO_URI) throw new Error("Mongo URI is not set");
    const connect = await mongoose.connect(ENV.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("MongoDB connected successfully", connect.connection.host);
  } catch (error) {
    console.error("Couldn't connect to DB.", error);
    process.exit(1); // It means fail, 1 is failure, 0 means success.
  }
};
