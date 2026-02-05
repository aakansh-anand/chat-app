import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Couldn't connect to DB.", error);
    process.exit(1); // It means fail, 1 is failure, 0 means success.
  }
};
