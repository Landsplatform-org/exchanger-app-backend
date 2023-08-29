import * as AppSettingController from "../controllers/app_setting.controller";

import express from "express";

const router = express.Router();

router.get("/get", AppSettingController.getAppSettings);
router.patch("/edit/:id", AppSettingController.updateAppSetting);
router.delete("/delete/:id", AppSettingController.deleteAppSetting);

export default router;