import mongoose from "mongoose";
import ICard from "../interfaces/card";

interface ICardModel extends ICard, mongoose.Document {}

const CardSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    tags: [String],
    description: String,
  },
  {
    timestamps: true,
  }
);
const Card = mongoose.model<ICardModel>("cards", CardSchema);
export default Card;
