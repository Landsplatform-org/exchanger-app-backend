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
exports.deleteParserPair = exports.updateParserPair = exports.addParserPair = exports.getParserPairsBySourceId = exports.getParserPairs = void 0;
const parser_pairs_model_1 = require("../models/parser_pairs.model");
const parserPairs = new parser_pairs_model_1.ParserPair();
const getParserPairs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page ? req.query.page : "0";
    const limit = req.query.limit ? req.query.limit : "10";
    try {
        const result = yield parserPairs.getAll(limit, page);
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
exports.getParserPairs = getParserPairs;
const getParserPairsBySourceId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sourceId = req.params.sourceId;
    try {
        const result = yield parserPairs.getAllBySourceId(sourceId);
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
exports.getParserPairsBySourceId = getParserPairsBySourceId;
const addParserPair = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyToAdd = req.body;
    if (!bodyToAdd)
        return;
    try {
        const result = yield parserPairs.add(bodyToAdd);
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
exports.addParserPair = addParserPair;
const updateParserPair = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const bodyToUpdate = req.body;
    if (!bodyToUpdate)
        return;
    try {
        const result = yield parserPairs.update(id, bodyToUpdate);
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
exports.updateParserPair = updateParserPair;
const deleteParserPair = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield parserPairs.delete(id);
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
exports.deleteParserPair = deleteParserPair;
