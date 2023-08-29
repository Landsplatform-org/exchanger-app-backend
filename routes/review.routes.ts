import * as ReviewController from "../controllers/review.controller";

import express from "express";

const router = express.Router();

router.get("/get", ReviewController.getReviews);
router.get("/get/:id", ReviewController.getReviewById);
router.post("/add", ReviewController.addReview);
router.patch("/edit/:id", ReviewController.updateReview);
router.delete("/delete/:id", ReviewController.deleteReview);

export default router;
