import mongoose from "mongoose";

export const Database = () => { 
  console.log("Connecting to MongoDB URI:", process.env.MONGODB_URI);
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
    });
};
