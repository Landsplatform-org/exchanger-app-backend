"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCurrency = exports.updateCurrency = exports.addCurrency = exports.getCurrencyById = exports.getCurrencies = void 0;
const currency_model_1 = require("../models/currency.model");
const currencies = new currency_model_1.Currency();
const getCurrencies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page ? req.query.page : "0";
    const limit = req.query.limit ? req.query.limit : "10";
    try {
        const result = yield currencies.getAll(limit, page);
        return res.status(200).send({
            status: 200,
            data: result,
            message: "Successful",
        });
    }
    catch (error) {
        return res.status(400).send({
            status: 400,
            message: error,
        });
    }
});
exports.getCurrencies = getCurrencies;
const getCurrencyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield currencies.getById(id);
        return res.status(200).send({
            status: 200,
            data: result,
            message: "Successful",
        });
    }
    catch (error) {
        return res.status(400).send({
            status: 400,
            message: error,
        });
    }
});
exports.getCurrencyById = getCurrencyById;
const addCurrency = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyToAdd = req.body;
    if (!bodyToAdd)
        return;
    try {
        const result = yield currencies.add(bodyToAdd);
        return res.status(200).send({
            status: 200,
            data: result,
            message: "Successful",
        });
    }
    catch (error) {
        return res.status(400).send({
            status: 400,
            message: error,
        });
    }
});
exports.addCurrency = addCurrency;
const updateCurrency = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const bodyToUpdate = req.body;
    if (!bodyToUpdate)
        return;
    try {
        const result = yield currencies.update(id, bodyToUpdate);
        return res.status(200).send({
            status: 200,
            data: result,
            message: "Successful",
        });
    }
    catch (error) {
        return res.status(400).send({
            status: 400,
            message: error,
        });
    }
});
exports.updateCurrency = updateCurrency;
const deleteCurrency = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield currencies.delete(id);
        return res.status(200).send({
            status: 200,
            data: result,
            message: "Successful",
        });
    }
    catch (error) {
        return res.status(400).send({
            status: 400,
            message: error,
        });
    }
});
exports.deleteCurrency = deleteCurrency;
