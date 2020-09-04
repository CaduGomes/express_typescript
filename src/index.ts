import app from "./config/server";
import mongoose from "mongoose";

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
