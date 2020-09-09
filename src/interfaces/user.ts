import IBoard from "./board";

export default interface IUser {
  _id: any;
  name: string;
  email: string;
  password_hash?: string;
  refresh_token?: string;
  boards?: Array<IBoard> | Array<any>;
}
