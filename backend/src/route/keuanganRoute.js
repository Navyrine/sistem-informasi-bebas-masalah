import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import handleFileKeuangan from "../middleware/handleFileKeuangan.js";
import {
  presentKeuangan,
  presentStatusKeuanganByMhsId,
  presentKeuanganById,
  presentKeuanganByMhsId,
  newKeuangan,
  changeKeuangan,
  changeStatusKeuangan,
} from "../controller/keuanganController.js";

const keuanganRoute = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Keuangan
 *     description: API untuk mengelola data keuangan
 */

/**
 * @swagger
 * /keuangan:
 *    get:
 *      summary: Role pengawas keuangan
 *      tags: [Keuangan]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Get all data keuangan
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Keuangan"
 *        401:
 *         $ref: "#/components/responses/401"
 *        403:
 *         $ref: "#/components/responses/403"
 *        409:
 *         $ref: "#/components/responses/409"
 */
keuanganRoute.get(
  "/keuangan",
  authenticate,
  authorize("pengawas_keuangan"),
  presentKeuangan
);

/**
 * @swagger
 * /keuangan/mhs:
 *    get:
 *      summary: Role mahasiswa
 *      tags: [Keuangan]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Get data keuangan by id mhs
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/KeuanganById"
 *        401:
 *         $ref: "#/components/responses/401"
 *        403:
 *         $ref: "#/components/responses/403"
 *        409:
 *         $ref: "#/components/responses/409"
 */
keuanganRoute.get(
  "/keuangan/mhs",
  authenticate,
  authorize("mahasiswa"),
  presentKeuanganByMhsId
);

/**
 * @swagger
 * /keuangan/mhs/status:
 *    get:
 *      summary: Role mahasiswa
 *      tags: [Keuangan]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Get status keuangan by id mhs
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/StatusKeuanganByMhsId"
 *        401:
 *         $ref: "#/components/responses/401"
 *        403:
 *         $ref: "#/components/responses/403"
 *        409:
 *         $ref: "#/components/responses/409"
 */
keuanganRoute.get(
  "/keuangan/mhs/status",
  authenticate,
  authorize("mahasiswa"),
  presentStatusKeuanganByMhsId
);

/**
 * @swagger
 * /keuangan/{id_keuangan}:
 *    get:
 *      summary: Role mahasiswa dan pengawas keuangan
 *      tags: [Keuangan]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id_keuangan
 *          schema:
 *            type: integer
 *          required: true
 *      responses:
 *        200:
 *          description: Get data keuangan by id keuangan
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/KeuanganById"
 *        401:
 *         $ref: "#/components/responses/401"
 *        403:
 *         $ref: "#/components/responses/403"
 *        409:
 *         $ref: "#/components/responses/409"
 */
keuanganRoute.get(
  "/keuangan/:id_keuangan",
  authenticate,
  authorize("mahasiswa", "pengawas_keuangan"),
  presentKeuanganById
);

/**
 * @swagger
 * /keuangan:
 *    post:
 *      summary: Role mahasiswa
 *      tags: [Keuangan]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              required: [keuangan]
 *              properties:
 *                keuangan:
 *                  type: string
 *                  format: binary
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
keuanganRoute.post(
  "/keuangan",
  authenticate,
  authorize("mahasiswa"),
  handleFileKeuangan.single("keuangan"),
  newKeuangan
);

/**
 * @swagger
 * /keuangan/status/{id_keuangan}:
 *    put:
 *      summary: Role pengawas keuangan
 *      tags: [Keuangan]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id_keuangan
 *          schema:
 *            type: integer
 *          required: true
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required: [rincian, status]
 *              properties:
 *                rincian:
 *                  type: string
 *                status:
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
keuanganRoute.put(
  "/keuangan/status/:id_keuangan",
  authenticate,
  authorize("pengawas_keuangan"),
  changeStatusKeuangan
);

/**
 * @swagger
 * /keuangan/{id_keuangan}:
 *    put:
 *      summary: Role mahasiswa
 *      tags: [Keuangan]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id_keuangan
 *          schema:
 *            type: integer
 *          required: true
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              required: [keuangan]
 *              properties:
 *                keuangan:
 *                  type: string
 *                  format: binary
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
keuanganRoute.put(
  "/keuangan/:id_keuangan",
  authenticate,
  authorize("mahasiswa"),
  handleFileKeuangan.single("keuangan"),
  changeKeuangan
);

export default keuanganRoute;
