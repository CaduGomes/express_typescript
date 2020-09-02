import { Request, Response, NextFunction } from "express";

export const register = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  res.send("Cadastrado");
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  res.send("Cadastrado");
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  res.send("Cadastrado");
};
