"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserController = __importStar(require("../controllers/user.controller"));
const validation_1 = require("../helpers/validation");
const authToken_1 = require("../middlewares/authToken");
const express_1 = __importDefault(require("express"));
const refreshToken_1 = require("../middlewares/refreshToken");
const multer_1 = require("../config/multer");
const router = express_1.default.Router();
router.get("/get", authToken_1.authenticateToken, UserController.getUsers);
router.post("/add", authToken_1.authenticateToken, UserController.addUser);
router.patch("/edit/:id", authToken_1.authenticateToken, UserController.updateUser);
router.delete("/delete/:id", authToken_1.authenticateToken, UserController.deleteUser);
router.post("/register", validation_1.signUpValidation, UserController.registerUser);
router.post("/forget-password", validation_1.forgetPasswordValidation, UserController.forgetPassword);
router.post("/change-password/:id", authToken_1.authenticateToken, UserController.changePassword);
router.post("/change-email", authToken_1.authenticateToken, UserController.checkEMail);
router.post("/set-avatar/:id", authToken_1.authenticateToken, multer_1.upload.single("avatar"), UserController.setAvatar);
router.get("/get/:id", authToken_1.authenticateToken, UserController.getUserById);
router.post("/login", UserController.authJWT);
router.post("/refresh", refreshToken_1.refreshToken, UserController.refreshJWT);
exports.default = router;
