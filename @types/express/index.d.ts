import IUser from "../../src/interfaces/user";
import IBoard from "../../src/interfaces/board";
import IList from "../../src/interfaces/list";
import ICard from "../../src/interfaces/card";

declare global {
  namespace Express {
    export interface Request {
      user: IUser;
      board: IBoard;
      list: IList;
      Card: ICard;
    }
  }
}
