import mongoose from "mongoose";

let isConnected: boolean = false;

interface Options {
  dbName: string;
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

const option: Options = {
  dbName: "pormptia",
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const connectDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("database connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION ?? "", option);

    isConnected = true;
  } catch (error) {
    console.log(error, "error in connecting to MongoDB");
  }
};
