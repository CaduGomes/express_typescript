import { Router } from "express";
import * as controller from "../controllers/card";
import { token } from "../middlewares/auth";
import { canEditListsAndCards } from "../middlewares/board";
const router = Router();

router.post("/card", token, canEditListsAndCards, controller.post);
router.get("/card", token, canEditListsAndCards, controller.get);
router.get("/card/:id", token, canEditListsAndCards, controller.getOne);
router.delete("/card/:id", token, canEditListsAndCards, controller.remove);
// router.patch("/board", token, controller.changeList);
// router.patch("/board", token, controller.changeCard);
// router.delete("/board", token, controller.delete);

export default router;
