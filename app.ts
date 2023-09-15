import express, { Express } from "express";

import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import indexRouter from "./routes/index.routes";

dotenv.config();

const app: Express = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.static("public"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000 }));

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
