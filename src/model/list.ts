import mongoose from "mongoose";
import IList from "../interfaces/list";

interface IListModel extends IList, mongoose.Document {}

const ListSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "cards" }],
  },
  {
    timestamps: true,
  }
);
const List = mongoose.model<IListModel>("lists", ListSchema);
export default List;
