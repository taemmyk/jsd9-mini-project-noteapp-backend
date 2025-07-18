import chalk from "chalk";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import limiter from "./middlewares/rateLimiter.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorhandler.js";
import routes from "./api/v1/routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

app.set("trust proxy", 1);

app.use(helmet());
const corsOptions = {
  origin: [process.env.CLIENT_URL],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true, //this cookie
};

app.use(cors(corsOptions));
app.set("trust proxy", 1);
app.use(limiter); // Middleware for rate limiting
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
