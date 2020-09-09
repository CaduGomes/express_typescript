import { Request, Response, NextFunction } from "express";
import IError from "../interfaces/error";
import jwt from "jsonwebtoken";
import User from "../model/user";
import { QueryPopulateOptions } from "mongoose";

export const token = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.get("Authorization");

  try {
    if (!header) {
      throw <IError>{ msg: "Token não encontrado", status: 401 };
    }

    const token = header.split(" ")[1];

    const tokenData = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const userId = tokenData["userId"];

    if (!userId) {
      throw <IError>{ msg: "Token não assinado", status: 401 };
    }

    const user = await User.findById(userId);

    if (!user) {
      throw <IError>{ msg: "Usuário não encontrado", status: 404 };
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
