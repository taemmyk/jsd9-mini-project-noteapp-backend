import chalk from "chalk";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import errorHandler from "./middlewares/errorhandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(chalk.green("Connected to Mongo database"));
  } catch (err) {
    console.error(chalk.red(`MongoDB connection error ${err}`));
    process.exit(1);
  }
})();

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on ${chalk.blue(`http://localhost:${PORT}`)}`);
});
