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

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API untuk Authentication dan Authorization
 */

/**
 * @swagger
 * /register:
 *    post:
 *      summary: Role administrator
 *      tags: [Auth]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required: [nama, username, email, password, role]
 *              properties:
 *                nama:
 *                  type: string
 *                username:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                role:
 *                  type: string
 *      responses:
 *        "200":
 *          $ref: "#/components/responses/200"
 *        "400":
 *          $ref: "#/components/responses/400"
 *        "409":
 *          $ref: "#/components/responses/409"
 */
authRoute.post(
  "/register",
  authenticate,
  authorize("administrator"),
  registerAccount
);

/**
 * @swagger
 * /login:
 *    post:
 *      summary: Login account
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required: [username, password]
 *              properties:
 *                username:
 *                  type: string
 *                password:
 *                  type: string
 *      responses:
 *        200:
 *          description: OK
 *          headers:
 *            Set-Cookie:
 *              schema:
 *                type: string
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/AuthResponse"
 *        400:
 *         $ref: "#/components/responses/400"
 *        401:
 *         $ref: "#/components/responses/401"
 *        403:
 *         $ref: "#/components/responses/403"
 *        409:
 *         $ref: "#/components/responses/409"
 */
authRoute.post("/login", loginAccount);
authRoute.post("/refresh-token", refreshToken);

/**
 * @swagger
 * /logout:
 *    post:
 *      summary: Logout account
 *      tags: [Auth]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          $ref: "#/components/responses/200"
 *        401:
 *          $ref: "#/components/responses/401"
 */
authRoute.post("/logout", authenticate, logoutAccount);

export default authRoute;
