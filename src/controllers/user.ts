import { Request, Response, NextFunction } from "express";

export const homepage = (req: Request, res: Response, next: NextFunction) => {
  const nhaw = {
    salve: "yodinha",
  };

  res.json(nhaw);
};

export const teste = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  res.send("isso")
};
