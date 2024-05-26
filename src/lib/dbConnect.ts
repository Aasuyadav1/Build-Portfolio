import mongoose from "mongoose";

interface Connection {
  isConnected?: number;
}

const connection: Connection = {};

export const dbConnect = async (): Promise<void> => {
  if (connection.isConnected) {
    console.log("Already connected");
    return;
  }

  if (!process.env.MONGOOSE_URI) {
    throw new Error("MONGOOSE_URI environment variable is not defined");
  }

  try {
    const mongooseInstance = mongoose.createConnection(process.env.MONGOOSE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connection.isConnected = mongooseInstance.readyState;

    if (connection.isConnected === 1) {
      console.log("Connected to database");
    } else {
      throw new Error("Failed to connect to database");
    }
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Database connection error");
  }
};