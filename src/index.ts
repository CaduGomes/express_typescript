import app from "./config/server";
import userRoute from "./routes/user";
import authRoute from "./routes/auth";

app.use(userRoute);
app.use(authRoute);

app.listen(3333, () => {
  console.log("Server iniciando");
});
