import * as CurrencyController from "../controllers/currency.controller";

import express from "express";

const router = express.Router();

router.get("/get", CurrencyController.getCurrencies);
router.get("/get/:id", CurrencyController.getCurrencyById);
router.post("/add", CurrencyController.addCurrency);
router.put("/edit/:id", CurrencyController.updateCurrency);
router.delete("/delete/:id", CurrencyController.deleteCurrency);

export default router;

