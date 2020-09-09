import { Request, Response, NextFunction } from "express";

export const post = async (req: Request, res: Response, next: NextFunction) => {
  const { name, description, tags, listId } = req.body;
  const board = req.board;
};

export const get = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
