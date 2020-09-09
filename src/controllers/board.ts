import { Request, Response, NextFunction } from "express";
import { QueryPopulateOptions } from "mongoose";
import IRes from "../interfaces/response";
import IBoard from "../interfaces/board";
import Board from "../model/board";
import User from "../model/user";
import IError from "../interfaces/error";
import IUser from "../interfaces/user";

export const post = async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const { name }: IBoard = req.body;

  try {
    if (!name) {
      throw <IError>{ msg: "Nome do quadro não encontrado!", status: 409 };
    }
    const board = new Board(<IBoard>{
      name,
      owner: _id,
    });

    await board.save();

    await User.findByIdAndUpdate(_id, { $push: { boards: board._id } });

    return res.status(200).json(<IRes>{ msg: "Criado com sucesso" });
  } catch (err) {
    next(err);
  }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  const boards = await Board.find().populate("lists")

  return res.status(200).json(<IRes>{ data: boards });
};

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { boards } = req.user;

  const boardId = req.params.id;

  const board = boards.find((board) => board._id == boardId);

  if (!board?._id) {
    next(<IError>{ msg: "Nenhum quadro encontrado!", status: 404 });
  }

  return res.status(200).json(<IRes>{ data: board });
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id } = req.user;
  const boardId = req.params.id;

  try {
    const board = await Board.findById(boardId).populate(<QueryPopulateOptions>{
      path: "Owner",
      match: <IUser>{ _id },
    });

    await board.remove();

    return res.status(200).json(<IRes>{ msg: "Deletado com sucesso!" });
  } catch (err) {
    next(<IError>{ msg: "Quadro não encontrado", status: 400 });
  }
};
