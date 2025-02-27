import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export const connectToDB = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("✅ Already connected to MongoDB.");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "test", // Change to your database name
    });
    console.log("✅ MongoDB connected successfully.");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};
