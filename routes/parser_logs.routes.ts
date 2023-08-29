import * as ParserLogsController from "../controllers/parser_logs.controller";

import express from "express";

const router = express.Router();

router.get("/get", ParserLogsController.getParserLogs);
router.get("/get/:id", ParserLogsController.getParserLogById);
router.post("/add", ParserLogsController.addParserLog);
router.put("/edit/:id", ParserLogsController.updateParserLog);
router.delete("/delete/:id", ParserLogsController.deleteParserLog);

export default router;

