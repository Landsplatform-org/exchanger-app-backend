import * as UserController from "../controllers/user.controller";

import express, { Express } from "express";

const webRouter: Express = express();

// webRouter.set("view engine", "ejs");
// webRouter.set("views", __dirname + "/views");

webRouter.get("/reset-password", UserController.resetPassword);
webRouter.get("/mail-verification", UserController.verifyMail);
webRouter.get("/change-email", UserController.changeEmail);

export default webRouter;
