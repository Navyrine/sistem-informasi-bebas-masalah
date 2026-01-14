import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import {
  presentJurusan,
  presentJurusanById,
  newJurusan,
  changeJurusan,
} from "../controller/jurusanController.js";

const jurusanRouter = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Jurusan
 *     description: API untuk mengelola data jurusan
 */

/**
 * @swagger
 * /jurusan:
 *    get:
 *      summary: Role administrator
 *      tags: [Jurusan]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Get all data jurusan
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Jurusan"
 *        401:
 *         $ref: "#/components/responses/401"
 *        403:
 *         $ref: "#/components/responses/403"
 *        409:
 *         $ref: "#/components/responses/409"
 */
jurusanRouter.get(
  "/jurusan",
  authenticate,
  authorize("administrator"),
  presentJurusan
);

/**
 * @swagger
 * /jurusan/{id_jurusan}:
 *    get:
 *      summary: Role administrator
 *      tags: [Jurusan]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id_jurusan
 *          schema:
 *            type: integer
 *          required: true
 *      responses:
 *        200:
 *          description: Get data jurusan by id jurusan
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Jurusan"
 *        401:
 *         $ref: "#/components/responses/401"
 *        403:
 *         $ref: "#/components/responses/403"
 *        409:
 *         $ref: "#/components/responses/409"
 */
jurusanRouter.get(
  "/jurusan/:id_jurusan",
  authenticate,
  authorize("administrator"),
  presentJurusanById
);

/**
 * @swagger
 * /jurusan:
 *    post:
 *      summary: Role administrator
 *      tags: [Jurusan]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required: [nama_jurusan]
 *              properties:
 *                nama_jurusan:
 *                  type: string
 *      responses:
 *        200:
 *          $ref: "#components/responses/200"
 *        400:
 *          $ref: "#components/responses/400"
 *        401:
 *         $ref: "#/components/responses/401"
 *        403:
 *         $ref: "#/components/responses/403"
 *        409:
 *         $ref: "#/components/responses/409"
 */
jurusanRouter.post(
  "/jurusan",
  authenticate,
  authorize("administrator"),
  newJurusan
);

/**
 * @swagger
 * /jurusan/{id_jurusan}:
 *    put:
 *      summary: Role administrator
 *      tags: [Jurusan]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id_jurusan
 *          schema:
 *            type: integer
 *          required: true
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required: [nama_jurusan]
 *              properties:
 *                nama_jurusan:
 *                  type: string
 *      responses:
 *        200:
 *          $ref: "#components/responses/200"
 *        400:
 *          $ref: "#components/responses/400"
 *        401:
 *         $ref: "#/components/responses/401"
 *        403:
 *         $ref: "#/components/responses/403"
 *        409:
 *         $ref: "#/components/responses/409"
 */
jurusanRouter.put(
  "/jurusan/:id_jurusan",
  authenticate,
  authorize("administrator"),
  changeJurusan
);

export default jurusanRouter;
