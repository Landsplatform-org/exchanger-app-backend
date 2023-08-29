import appSettingRouter from "./app_setting.routes";
import bankAccountRouter from "./bank_account.routes";
import currencyRouter from "./currency.routes";
import directionRouter from "./direction.routes";
import exhangeRouter from "./exchange.routes";
import express from "express";
import faqCategoryRouter from "./faq_category.routes";
import faqRouter from "./faq.routes";
import gatewayRouter from "./gateway.routes";
import newsRouter from "./news.routes";
import pageRouter from "./page.routes"
import parserLogsRouter from "./parser_logs.routes";
import parserPairsRouter from "./parser_pairs.routes";
import reviewRouter from "./review.routes";
import techsupportRouter from "./tech_support.routes";
import userRouter from ".//user.routes";
import webRouter from "./web.routes";

const router = express.Router();

router.use("/users", userRouter);
router.use("/gateways", gatewayRouter);
router.use("/currencies", currencyRouter);
router.use("/exchanges", exhangeRouter);
router.use("/directions", directionRouter);
router.use("/parser-logs", parserLogsRouter);
router.use("/parser-pairs", parserPairsRouter);
router.use("/news", newsRouter);
router.use("/pages", pageRouter);
router.use("/reviews", reviewRouter);
router.use("/faq-categories", faqCategoryRouter);
router.use("/faq", faqRouter);
router.use("/router-settings", appSettingRouter);
router.use("/bank-accounts", bankAccountRouter);

router.use("/tech-support", techsupportRouter);

router.use("/web", webRouter);

export default router;