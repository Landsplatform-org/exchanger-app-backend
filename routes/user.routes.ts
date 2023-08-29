import * as UserController from "../controllers/user.controller";

import {
  forgetPasswordValidation,
  signUpValidation,
} from "../helpers/validation";

import express from "express";
import { upload } from "../config/multer";

const router = express.Router();

router.get("/get", UserController.getUsers);
router.get("/get/:id", UserController.getUserById);
router.post("/add", UserController.addUser);
router.patch("/edit/:id", UserController.updateUser);
router.delete("/delete/:id", UserController.deleteUser);

router.post("/register", signUpValidation, UserController.registerUser);
router.post("/login", UserController.loginUser);
router.post("/forget-password", forgetPasswordValidation, UserController.forgetPassword);
router.post("/change-password/:id", UserController.changePassword);
router.post("/change-email", UserController.checkEMail);

router.post("/set-avatar/:id",upload.single("avatar"), UserController.setAvatar);

export default router;
