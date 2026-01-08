import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import {
  registerAccount,
  loginAccount,
  refreshToken,
  logoutAccount,
} from "../controller/authController.js";

const authRoute = express.Router();

authRoute.post("/register", registerAccount);
authRoute.post("/login", loginAccount);
authRoute.post("/refresh-token", refreshToken);
authRoute.post("/logout", logoutAccount);

export default authRoute;
