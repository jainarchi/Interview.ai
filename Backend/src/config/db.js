import mongoose from "mongoose";
import { appConfig } from "./config.js";



const connectDB = async () => {
  try {
    await mongoose.connect(appConfig.mongoURI)
    console.log("MongoDB connected")

  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
}



export default connectDB;