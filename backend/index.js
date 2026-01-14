import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/util/swagger.js";
import errorHandler from "./src/middleware/errorHandle.js";
import jurusanRouter from "./src/route/jurusanRoute.js";
import prodiRouter from "./src/route/prodiRoute.js";
import mahasiswaRouter from "./src/route/mahasiswaRoute.js";
import pegawaiRouter from "./src/route/pegawaiRoute.js";
import beritaRoute from "./src/route/beritaRoute.js";
import tugasAkhirRoute from "./src/route/tugasAkhirRoute.js";
import keuanganRoute from "./src/route/keuanganRoute.js";
import perpustakaanRoute from "./src/route/perpustakaanRoute.js";
import akademikRoute from "./src/route/akademikRoute.js";
import authRoute from "./src/route/authRoute.js";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/", jurusanRouter);
app.use("/", prodiRouter);
app.use("/", mahasiswaRouter);
app.use("/", pegawaiRouter);
app.use("/", beritaRoute);
app.use("/", tugasAkhirRoute);
app.use("/", keuanganRoute);
app.use("/", perpustakaanRoute);
app.use("/", akademikRoute);
app.use("/", authRoute);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      requestInterceptor: (req) => {
        req.withCredentials = true;
        return req;
      },
    },
  })
);

app.use(errorHandler);
app.listen(3000, () => {
  console.log("Server running at port 3000");
});
