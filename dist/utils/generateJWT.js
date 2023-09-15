"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateAccessToken = (user) => {
    const plainUser = JSON.parse(JSON.stringify(user));
    const accessToken = jsonwebtoken_1.default.sign(plainUser, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "3d",
    });
    return accessToken;
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (user) => {
    const plainUser = JSON.parse(JSON.stringify(user));
    const refreshToken = jsonwebtoken_1.default.sign(plainUser, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
    return refreshToken;
};
exports.generateRefreshToken = generateRefreshToken;
