"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const passport_1 = __importDefault(require("passport"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
app.use((0, cookie_parser_1.default)("keyboard cat"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
require("./config/passport")(passport_1.default);
app.use("/api", index_routes_1.default);
app.use((err, res) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error";
    res.status(err.statusCode).json({
        message: err.message,
    });
});
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
