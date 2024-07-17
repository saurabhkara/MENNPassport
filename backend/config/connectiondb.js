import mongoose from "mongoose";

const connectDB = async (DB_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: "passportjsauthdb",
    };
    await mongoose.connect(DB_URL, DB_OPTIONS);
    console.log("Connected successfully....");
  } catch (error) {
    console.log("DB Connection error", error);
  }
};

export default connectDB;
