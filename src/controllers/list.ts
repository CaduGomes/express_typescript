import { Request, Response, NextFunction } from "express";
import IList from "../interfaces/list";
import List from "../model/list";
import IRes from "../interfaces/response";
import Board from "../model/board";
import IError from "../interfaces/error";

export const post = async (req: Request, res: Response, next: NextFunction) => {
  const { name }: IList = req.body;
  const { boardId } = req.body;

  try {
    if (!boardId) {
      throw <IError>{ msg: "Board ID?", status: 404 };
    }

    const list = await List.create({ name });

    await Board.findByIdAndUpdate(boardId, { $push: { lists: list._id } });

    return res.status(200).json(<IRes>{ msg: "Lista criada com sucesso" });
  } catch (err) {
    next(err);
  }
};

export const move = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

// export const getOne = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    await List.findByIdAndDelete(id);
    return res.status(200).json(<IRes>{ msg: "Lista deletado com sucesso!" });
  } catch (err) {
    next(err);
  }
};
