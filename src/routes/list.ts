import { Router } from "express";
import * as controller from "../controllers/list";
import { token } from "../middlewares/auth";
import { canEditListsAndCards } from "../middlewares/board";
const router = Router();

router.post("/list", token, canEditListsAndCards, controller.post);
router.delete("/list/:id", token, canEditListsAndCards, controller.remove);
// router.get("/list", token, canEditListsAndCards, controller.get);
// router.get("/list/:id", token, canEditListsAndCards, controller.getOne);
router.patch("/list", token, controller.move);
// router.patch("/list", token, controller.changeCard);
// router.delete("/list", token, controller.delete);

export default router;
