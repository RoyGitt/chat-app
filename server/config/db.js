import mongoose from "mongoose";

const connectDb = async () => {
  const connectionString = process.env.MONGO_URI;

  try {
    const conn = await mongoose.connect(connectionString);
    console.log(`MONGO CONNECTED ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDb;
