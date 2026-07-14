import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected DB");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
