import * as mongoose from "mongoose";
import IUser from "../interfaces/user";

export interface IUserModel extends IUser, mongoose.Document {}

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: false },
    refresh_token: { type: String, required: false },
    boards: [{ type: mongoose.Schema.Types.ObjectId, ref: "boards" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUserModel>("users", UserSchema);
