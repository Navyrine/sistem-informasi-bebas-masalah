import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import {
  presentPegawai,
  presentPegawaiById,
  newPegawai,
  changePegawai,
  remove,
} from "../controller/pegawaiController.js";

const pegawaiRouter = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Pegawai
 *     description: API untuk mengelola data pegawai
 */

/**
 * @swagger
 * /pegawai:
 *    get:
 *      summary: Role administrator
 *      tags: [Pegawai]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Get all data pegawai
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Pegawai"
 *        401:
 *         $ref: "#/components/responses/401"
 *        403:
 *         $ref: "#/components/responses/403"
 *        409:
 *         $ref: "#/components/responses/409"
 */
pegawaiRouter.get(
  "/pegawai",
  authenticate,
  authorize("administrator"),
  presentPegawai
);

/**
 * @swagger
 * /pegawai/{id_pegawai}:
 *    get:
 *      summary: Role administrator
 *      tags: [Pegawai]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id_pegawai
 *          schema:
 *            type: integer
 *          required: true
 *      responses:
 *        200:
 *          description: Get data pegawai by id pegawai
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Pegawai"
 *        401:
 *         $ref: "#/components/responses/401"
 *        403:
 *         $ref: "#/components/responses/403"
 *        409:
 *         $ref: "#/components/responses/409"
 */
pegawaiRouter.get(
  "/pegawai/:id_pegawai",
  authenticate,
  authorize("administrator"),
  presentPegawaiById
);

/**
 * @swagger
 * /pegawai:
 *    post:
 *      summary: Role administrator
 *      tags: [Pegawai]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required: [nama_pegawai, no_telp, alamat]
 *              properties:
 *                nama_pegawai:
 *                  type: string
 *                no_telp:
 *                  type: string
 *                alamat:
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
pegawaiRouter.post(
  "/pegawai",
  authenticate,
  authorize("administrator"),
  newPegawai
);

/**
 * @swagger
 * /pegawai/{id_pegawai}:
 *    put:
 *      summary: Role administrator
 *      tags: [Pegawai]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id_pegawai
 *          schema:
 *            type: integer
 *          required: true
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required: [nama_pegawai, no_telp, alamat]
 *              properties:
 *                nama_pegawai:
 *                  type: string
 *                no_telp:
 *                  type: string
 *                alamat:
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
pegawaiRouter.put(
  "/pegawai/:id_pegawai",
  authenticate,
  authorize("administrator"),
  changePegawai
);

/**
 * @swagger
 * /pegawai/{id_pegawai}:
 *    delete:
 *      summary: Role administrator
 *      tags: [Pegawai]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id_pegawai
 *          schema:
 *            type: integer
 *          required: true
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
pegawaiRouter.delete(
  "/pegawai/:id_pegawai",
  authenticate,
  authorize("administrator"),
  remove
);

export default pegawaiRouter;
