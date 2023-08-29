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
exports.deleteGateway = exports.updateGateway = exports.addGateway = exports.getGatewayById = exports.getGateways = void 0;
const gateway_model_1 = require("../models/gateway.model");
const gateways = new gateway_model_1.Gateway();
const getGateways = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page ? req.query.page : "0";
    const limit = req.query.limit ? req.query.limit : "10";
    try {
        const result = yield gateways.getAll(limit, page);
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
exports.getGateways = getGateways;
const getGatewayById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield gateways.getById(id);
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
exports.getGatewayById = getGatewayById;
const addGateway = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyToAdd = req.body;
    if (!bodyToAdd)
        return;
    try {
        const result = yield gateways.add(bodyToAdd);
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
exports.addGateway = addGateway;
const updateGateway = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const bodyToUpdate = req.body;
    if (!bodyToUpdate)
        return;
    try {
        const result = yield gateways.update(id, bodyToUpdate);
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
exports.updateGateway = updateGateway;
const deleteGateway = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield gateways.delete(id);
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
exports.deleteGateway = deleteGateway;
