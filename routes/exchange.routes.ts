import * as ExchangeController from "../controllers/exchange.controller";

import express from "express";

const router = express.Router();

router.get("/get", ExchangeController.getExchanges);
router.get("/get/:id", ExchangeController.getExchangeById);
router.post("/add", ExchangeController.addExchange);
router.put("/edit/:id", ExchangeController.updateExchange);
router.delete("/delete/:id", ExchangeController.deleteExchange);

export default router;

