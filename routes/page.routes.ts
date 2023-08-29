import * as PageController from "../controllers/page.controller";

import express from "express";
import { upload } from "../config/multer";

const router = express.Router();

router.get("/get", PageController.getPages);
router.get("/get/:id", PageController.getPageById);
router.post("/add", PageController.addPage);
router.patch("/edit/:id", PageController.updatePage);
router.delete("/delete/:id", PageController.deletePage);

router.post("/set-photo/:id",upload.single("photo"), PageController.setPhoto);

export default router;
