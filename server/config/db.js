import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connectionString = await mongoose.connect(
      "mongodb+srv://roy:roy@cluster0.2bjrvgu.mongodb.net/chat-app?retryWrites=true&w=majority"
    );
    console.log(`MONGO CONNECTED ${connectionString.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDb;
