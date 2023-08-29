"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.fileFilter = exports.fileStorage = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
exports.fileStorage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path_1.default.join(__dirname, "..", "public", "uploads"));
    },
    filename: (req, file, callback) => {
        const name = Date.now() + "_" + file.originalname;
        callback(null, name);
    },
});
const fileFilter = (req, file, callback) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        callback(null, true);
    }
    else {
        callback(null, false);
    }
};
exports.fileFilter = fileFilter;
exports.upload = (0, multer_1.default)({
    storage: exports.fileStorage,
    fileFilter: exports.fileFilter,
    limits: { fileSize: 1 * 1024 * 1024 },
});
