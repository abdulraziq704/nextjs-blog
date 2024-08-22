import mongoose from "mongoose";


export const Database= () => { 
    mongoose
  .connect(
    "mongodb+srv://meharabdulraziq3000:FvMNDmmUDxTWXM4m@cluster0.hywm57o.mongodb.net/BLOG-APP",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
 }