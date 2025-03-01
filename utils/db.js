import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
let isConnected = false; // Track connection status

const connectToDB = async () => {
  if (isConnected) {
    console.log("⚡ Already connected to MongoDB");
    return;
  }

  try {
    mongoose.set("strictQuery", false);

    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 60000, // Increase timeout (1min)
      socketTimeoutMS: 60000, // Allow queries to run for 1min
      connectTimeoutMS: 60000, // Wait up to 1min before failing connection
    });

    isConnected = true;
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("Database connection failed");
  }
};

export default connectToDB;
