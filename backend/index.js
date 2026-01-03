import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import errorHandler from "./src/middleware/errorHandle.js";
import jurusanRouter from "./src/route/jurusanRoute.js";
import prodiRouter from "./src/route/prodiRoute.js";
import mahasiswaRouter from "./src/route/mahasiswaRoute.js";
import pegawaiRouter from "./src/route/pegawaiRoute.js";
import beritaRoute from "./src/route/beritaRoute.js";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", jurusanRouter);
app.use("/", prodiRouter);
app.use("/", mahasiswaRouter);
app.use("/", pegawaiRouter);
app.use("/", beritaRoute);

app.use(errorHandler);
app.listen(3000, () => {
  console.log("Server running at port 3000");
});
