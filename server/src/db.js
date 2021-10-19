import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(
      "mongodb+srv://user:admin@cluster0.qjxui.mongodb.net/todo-demo-v0?retryWrites=true&w=majority"
    );
    console.log("Connected to database.");
  } catch (error) {
    console.log("Could not connect to database.", error);
  }
};

export default connectDb;
