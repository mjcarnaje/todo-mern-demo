import { model, Schema } from "mongoose";

const taskSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("task", taskSchema);
