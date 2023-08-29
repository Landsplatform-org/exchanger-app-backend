import * as DirectionController from "../controllers/direction.controller";

import express from "express";

const router = express.Router();

router.get("/get", DirectionController.getDirections);
router.get("/get/:id", DirectionController.getDirectionById);
router.post("/add", DirectionController.addDirection);
router.put("/edit/:id", DirectionController.updateDirection);
router.delete("/delete/:id", DirectionController.deleteDirection);
router.post("/refresh", DirectionController.refreshDirections);

export default router;

