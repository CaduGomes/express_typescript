import { Request, Response, NextFunction } from "express";

export const homepage = async (req: Request, res: Response) => {
  const nhaw = {
    salve: "yodinha",
  };

  return res.json(nhaw);
};

export const teste = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  res.send("isso")
};
