import * as ParserPairsController from "../controllers/parser_pairs.controller";

import express from "express";

const router = express.Router();

router.get("/get", ParserPairsController.getParserPairs);
router.get("/get/:sourceId", ParserPairsController.getParserPairsBySourceId);
router.post("/add", ParserPairsController.addParserPair);
router.put("/edit/:id", ParserPairsController.updateParserPair);
router.delete("/delete/:id", ParserPairsController.deleteParserPair);

export default router;

