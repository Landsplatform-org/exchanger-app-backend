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
const TechSupportController = __importStar(require("../controllers/tech_support.controller"));
const express_1 = __importDefault(require("express"));
const multer_1 = require("../config/multer");
const router = express_1.default.Router();
router.get("/get-tech-support-messages", TechSupportController.getTechSupportMessages);
router.get("/get-tech-support-message/:id", TechSupportController.getTechSupportMessageById);
router.post("/send-tech-support-message", multer_1.upload.single("file"), TechSupportController.sendTechSupportMessage);
router.delete("/delete-tech-support-message/:id", TechSupportController.deleteTechSupportMessage);
exports.default = router;
