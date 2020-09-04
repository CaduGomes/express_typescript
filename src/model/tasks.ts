import mongoose from "mongoose";

export interface ITask extends mongoose.Document {
  task: string;
  do: boolean;
  user: {
    name: string;
    email: string;
  };
}

export const TaskSchema = new mongoose.Schema(
  {
    task: { type: String, required: true },
    do: Boolean,
    user: {
      name: String,
      email: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITask>("tasks", TaskSchema);
