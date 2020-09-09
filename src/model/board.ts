import mongoose from "mongoose";
import IBoard from "../interfaces/board";

export interface IBoardModel extends IBoard, mongoose.Document {}

export const BoardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: "lists" }],
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Board = mongoose.model<IBoardModel>("boards", BoardSchema);
export default Board;
