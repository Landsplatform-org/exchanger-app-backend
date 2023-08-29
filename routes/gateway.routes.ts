import * as GatewayController from "../controllers/gateway.controller";

import express from "express";

const router = express.Router();

router.get("/get", GatewayController.getGateways);
router.get("/get/:id", GatewayController.getGatewayById);
router.post("/add", GatewayController.addGateway);
router.put("/edit/:id", GatewayController.updateGateway);
router.delete("/delete/:id", GatewayController.deleteGateway);

export default router;

