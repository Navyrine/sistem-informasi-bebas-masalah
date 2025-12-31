import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import jurusanRouter from "./src/route/jurusanRoute.js";
import errorHandler from "./src/middleware/errorHandle.js";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", jurusanRouter);

app.use(errorHandler);
app.listen(3000, () => {
  console.log("Server running at port 3000");
});
