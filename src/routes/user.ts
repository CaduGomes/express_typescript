import { Router } from "express";
import * as controller from "../controllers/user";
const router = Router();

router.get("/", controller.homepage);
router.post("/", controller.teste);

export default router;
