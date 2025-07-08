

import { Router } from "express";
import * as gadgetController from "../controllers/gadget.controller";

const router = Router();

router.get("/", gadgetController.getAllGadgets); 
router.post("/", gadgetController.createGadget);
router.patch("/:id", gadgetController.updateGadget);
router.delete("/:id", gadgetController.decommissionGadget);
router.post("/:id/self-destruct", gadgetController.selfDestruct);

export default router;
