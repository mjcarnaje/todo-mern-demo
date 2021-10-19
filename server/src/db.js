const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect("mongodb://localhost/todo-app");
    console.log("Connected to database.");
  } catch (error) {
    console.log("Could not connect to database.", error);
  }
};

export default connectDb;
