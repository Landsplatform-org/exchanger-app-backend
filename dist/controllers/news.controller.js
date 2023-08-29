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
exports.setPhoto = exports.deleteNews = exports.updateNews = exports.addNews = exports.getNewsById = exports.getNews = void 0;
const news_model_1 = require("../models/news.model");
const news = new news_model_1.News();
const getNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page ? req.query.page : "0";
    const limit = req.query.limit ? req.query.limit : "10";
    try {
        const result = yield news.getAll(limit, page);
        return res.status(200).send({
            status: 200,
            data: result,
            message: "Successful",
        });
    }
    catch (error) {
        return res.status(404).send({
            status: 404,
            message: error,
        });
    }
});
exports.getNews = getNews;
const getNewsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield news.getById(id);
        return res.status(200).send({
            status: 200,
            data: result,
            message: "Successful",
        });
    }
    catch (error) {
        return res.status(404).send({
            status: 404,
            message: error,
        });
    }
});
exports.getNewsById = getNewsById;
const addNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyToAdd = req.body;
    if (!bodyToAdd)
        return;
    try {
        const result = yield news.add(bodyToAdd);
        return res.status(201).send({
            status: 201,
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
exports.addNews = addNews;
const updateNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const bodyToUpdate = req.body;
    if (!bodyToUpdate)
        return;
    try {
        const result = yield news.update(id, bodyToUpdate);
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
exports.updateNews = updateNews;
const deleteNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield news.delete(id);
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
exports.deleteNews = deleteNews;
const setPhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!req.file)
        return res.status(404).send({
            status: 404,
            message: "File was not found",
        });
    const file = req.file.filename;
    try {
        const result = yield news.setPhoto(id, file);
        res.status(200).send({
            status: 200,
            message: result,
        });
    }
    catch (error) {
        res.status(400).send({
            status: 400,
            message: error,
        });
    }
});
exports.setPhoto = setPhoto;
