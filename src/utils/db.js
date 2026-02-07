import mongoose from "mongoose";
import { DATABASE_URI } from "../../config";

let cachedConnection = null;

async function connectToDatabase() {
  if (cachedConnection) {
    console.log("Using cached database connection");
    return cachedConnection;
  }

  try {
    if (!DATABASE_URI) {
      throw new Error("DATABASE_URI is not defined");
    }
    
    const connection = await mongoose.connect(DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });
    
    cachedConnection = connection;
    console.log("Connected to Database! Using connection pooling.");
    return connection;
  } catch (error) {
    console.error("Error connecting to Database:", error.message);
    throw error;
  }
}

export default connectToDatabase;
