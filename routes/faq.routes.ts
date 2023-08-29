import * as FAQController from "../controllers/faq.controller";

import express from "express";

const router = express.Router();

router.get("/get", FAQController.getFAQs);
router.get("/get/:id", FAQController.getFAQById);
router.post("/add", FAQController.addFAQ);
router.patch("/edit/:id", FAQController.updateFAQ);
router.delete("/delete/:id", FAQController.deleteFAQ);

export default router;