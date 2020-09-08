import express, { Request, Response, NextFunction } from "express";

import userRoute from "../routes/user";
import authRoute from "../routes/auth";
import IError from "../interfaces/error";
import IRes from "../interfaces/response";

const app: express.Application = express();

app.use(express.json());

app.use(userRoute);
app.use(authRoute);

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  console.log(err.msg);

  return res
    .status(err?.status || 500)
    .json(<IRes>{ msg: err?.msg || "Server Error" });
});

export default app;
