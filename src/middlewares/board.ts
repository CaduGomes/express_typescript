import { NextFunction, Response, Request } from "express";
import IBoard from "../interfaces/board";
import IError from "../interfaces/error";

export const canEditListsAndCards = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const { boards } = req.user;
  // const boardId = req.body.id;

  // try {
  //   const board: IBoard = boards.find((board) => board._id == boardId);
  //   if (!board) {
  //     throw <IError>{
  //       msg: "Sem permissão para modificar esse quadro!",
  //       status: 403,
  //     };
  //   }
  //   req.board = board;
  //   next();
  // } catch (err) {
  //   next(err);
  // }
  next();
};
