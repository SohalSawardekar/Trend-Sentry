import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connectToDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("⚡ Already connected to MongoDB");
      return;
    }
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("Database connection failed");
  }
};

export default connectToDB;
