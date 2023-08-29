import * as TechSupportController from "../controllers/tech_support.controller";

import express from "express";
import { upload } from "../config/multer";

const router = express.Router();

router.get("/get-tech-support-messages",  TechSupportController.getTechSupportMessages);
router.get("/get-tech-support-message/:id",  TechSupportController.getTechSupportMessageById);
router.post("/send-tech-support-message", upload.single("file"), TechSupportController.sendTechSupportMessage);
router.delete("/delete-tech-support-message/:id",  TechSupportController.deleteTechSupportMessage);

export default router