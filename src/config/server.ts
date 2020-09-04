import express from "express";

import userRoute from "../routes/user";
import authRoute from "../routes/auth";

const app: express.Application = express();

app.use(express.json());

app.use(userRoute);
app.use(authRoute);

export default app;
