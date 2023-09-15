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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExchange = exports.updateExchange = exports.addExchange = exports.getExchangeById = exports.getExchanges = void 0;
const exchange_model_1 = require("../models/exchange.model");
const crc_32_1 = __importDefault(require("crc-32"));
const exchanges = new exchange_model_1.Exchange();
const getExchanges = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page ? req.query.page : "0";
    const limit = req.query.limit ? req.query.limit : "10";
    const statusId = req.query.status ? req.query.status : "";
    const hash = req.query.hash ? req.query.hash : "";
    const sortType = req.query.date ? req.query.date : "ASC";
    try {
        const result = yield exchanges.getAll(limit, page, statusId, hash, sortType);
        console.log(result);
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
exports.getExchanges = getExchanges;
const getExchangeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield exchanges.getById(id);
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
exports.getExchangeById = getExchangeById;
const addExchange = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyToAdd = req.body;
    if (!bodyToAdd)
        return;
    const hashedBody = crc_32_1.default.buf((Object.values(bodyToAdd)));
    try {
        const result = yield exchanges.add(bodyToAdd, hashedBody);
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
exports.addExchange = addExchange;
const updateExchange = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const bodyToUpdate = req.body;
    if (!bodyToUpdate)
        return;
    try {
        const result = yield exchanges.update(id, bodyToUpdate);
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
exports.updateExchange = updateExchange;
const deleteExchange = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield exchanges.delete(id);
        return res.status(200).send({
            status: 200,
            data: result,
            message: "Successful"
        });
    }
    catch (error) {
        return res.status(400).send({
            status: 400,
            message: error
        });
    }
});
exports.deleteExchange = deleteExchange;
