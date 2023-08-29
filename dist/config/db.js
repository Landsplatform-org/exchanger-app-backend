"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mysql_1 = __importDefault(require("mysql"));
dotenv_1.default.config();
const db = mysql_1.default.createPool({
    connectionLimit: 10,
    host: process.env.DEFAULT_DB_HOST,
    port: process.env.DEFAULT_DB_PORT,
    user: process.env.DEFAULT_DB_USER,
    password: process.env.DEFAULT_DB_PASSWORD,
    database: process.env.DEFAULT_DB_NAME,
});
exports.default = db;
