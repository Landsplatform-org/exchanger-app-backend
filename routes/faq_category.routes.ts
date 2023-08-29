import * as FAQCategoryController from "../controllers/faq_category.controller";

import express from "express";

const router = express.Router();

router.get("/get", FAQCategoryController.getFAQCategories);
router.get("/get/:id", FAQCategoryController.getFAQCategoryById);
router.post("/add", FAQCategoryController.addFAQCategory);
router.patch("/edit/:id", FAQCategoryController.updateFAQCategory);
router.delete("/delete/:id", FAQCategoryController.deleteFAQCategory);

export default router;
