import * as NewsController from "../controllers/news.controller";

import express from "express";
import { upload } from "../config/multer";

const router = express.Router();

router.get("/get", NewsController.getNews);
router.get("/get/:id", NewsController.getNewsById);
router.post("/add", NewsController.addNews);
router.patch("/edit/:id", NewsController.updateNews);
router.delete("/delete/:id", NewsController.deleteNews);

router.post("/set-photo/:id",upload.single("photo"), NewsController.setPhoto);

export default router;