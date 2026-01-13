import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import {
  registerAccount,
  loginAccount,
  refreshToken,
  logoutAccount,
} from "../controller/authController.js";

const authRoute = express.Router();

authRoute.post(
  "/register",
  authenticate,
  authorize("administrator"),
  registerAccount
);
authRoute.post("/login", loginAccount);
authRoute.post("/refresh-token", authenticate, refreshToken);
authRoute.post("/logout", authenticate, logoutAccount);

export default authRoute;
