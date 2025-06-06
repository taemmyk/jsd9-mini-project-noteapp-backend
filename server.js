import chalk from "chalk";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./api/v1/routes.js";
import limiter from "./middlewares/rateLimiter.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorhandler.js";

dotenv.config();

const app = express();

app.set("trust proxy", 1);

const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(limiter);

app.use(express.json());

app.use(cookieParser());

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(chalk.green("Connected to Mongo database"));
  } catch (err) {
    console.error(chalk.red(`MongoDB connection error ${err}`));
    process.exit(1);
  }
})();

app.use("/mongo", routes());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on ${chalk.blue(`http://localhost:${PORT}`)}`);
});
