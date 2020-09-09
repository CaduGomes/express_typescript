import { Router } from "express";
import * as controller from "../controllers/board";
import { token } from "../middlewares/auth";
const router = Router();

router.post("/board", token, controller.post);
router.get("/board", token, controller.get);
router.get("/board/:id", token, controller.getOne);
router.delete("/board/:id", token, controller.remove);
// router.patch("/board", token, controller.changeList);
// router.patch("/board", token, controller.changeCard);
// router.delete("/board", token, controller.delete);

export default router;
