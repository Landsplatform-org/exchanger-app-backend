import * as BankAccountController from "../controllers/bank_account.controller";

import express from "express";

const router = express.Router();

router.get("/get", BankAccountController.getBankAccounts);
router.get("/get/:id", BankAccountController.getBankAccountById);
router.post("/add", BankAccountController.addBankAccount);
router.patch("/edit/:id", BankAccountController.updateBankAccount);
router.delete("/delete/:id", BankAccountController.deleteBankAccount);

export default router;