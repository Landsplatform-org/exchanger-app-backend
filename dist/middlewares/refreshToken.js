"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const refreshToken = (req, res, next) => {
    const token = extractTokenFromHeader(req);
    if (!token)
        return res.status(401).send({
            status: 401,
            message: "Unauthorized",
        });
    const payload = jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET);
    req["user"] = payload;
    next();
};
exports.refreshToken = refreshToken;
const extractTokenFromHeader = (req) => {
    var _a, _b;
    const [type, token] = (_b = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")) !== null && _b !== void 0 ? _b : [];
    return type === "Refresh" ? token : undefined;
};
