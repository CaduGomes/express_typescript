import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import app from "./config/server";
import userRoute from "./routes/board";
import authRoute from "./routes/auth";
import listRoute from "./routes/list";
import cardRoute from "./routes/card";
import IError from "./interfaces/error";
import IRes from "./interfaces/response";

mongoose
  .connect("mongodb://localhost:27017/TrelloClone", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(3333, () => {
      console.log("Server iniciando");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(userRoute);
app.use(authRoute);
app.use(listRoute);
app.use(cardRoute);

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  console.log(err.msg);

  return res
    .status(err?.status || 500)
    .json(<IRes>{ msg: err?.msg || "Server Error" });
});
