import express, { Express } from "express";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import expressSession from "express-session";
import indexRouter from "./routes/index.routes";
import passport from "passport";

dotenv.config();

const app: Express = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser("keyboard cat"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use("/api", indexRouter);

app.use((err: any, res: any) => {
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
