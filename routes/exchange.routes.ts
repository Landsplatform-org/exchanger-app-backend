import * as ExchangeController from "../controllers/exchange.controller";

import { authenticateToken } from "../middlewares/authToken";
import express from "express";

const router = express.Router();

router.get("/get", authenticateToken, ExchangeController.getExchanges);
router.get("/get/:id", authenticateToken, ExchangeController.getExchangeById);
router.post("/add", authenticateToken, ExchangeController.addExchange);
router.put("/edit/:id", authenticateToken, ExchangeController.updateExchange);
router.delete("/delete/:id", authenticateToken, ExchangeController.deleteExchange);

export default router;

