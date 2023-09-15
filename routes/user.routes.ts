import * as UserController from "../controllers/user.controller";

import {
  forgetPasswordValidation,
  signUpValidation,
} from "../helpers/validation";

import { authenticateToken } from "../middlewares/authToken";
import express from "express";
import { refreshToken } from "../middlewares/refreshToken";
import { upload } from "../config/multer";

const router = express.Router();

router.get("/get", authenticateToken, UserController.getUsers);
router.post("/add", authenticateToken, UserController.addUser);
router.patch("/edit/:id", authenticateToken, UserController.updateUser);
router.delete("/delete/:id", authenticateToken, UserController.deleteUser);

router.post("/register", signUpValidation, UserController.registerUser);
router.post("/forget-password", forgetPasswordValidation, UserController.forgetPassword);
router.post("/change-password/:id", authenticateToken, UserController.changePassword);
router.post("/change-email", authenticateToken, UserController.checkEMail);

router.post("/set-avatar/:id", authenticateToken, upload.single("avatar"), UserController.setAvatar);

router.get("/get/:id", authenticateToken, UserController.getUserById);
router.post("/login", UserController.authJWT);
router.post("/refresh", refreshToken, UserController.refreshJWT)


export default router;
