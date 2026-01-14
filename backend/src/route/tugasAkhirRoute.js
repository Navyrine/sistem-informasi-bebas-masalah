import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import uploadFile from "../middleware/handleFileTugasAkhir.js";
import {
  presentTugasAkhir,
  presentTugasAkhirById,
  presentTugasAkhirByMhsId,
  presentStatusTugasAkhirByMhsId,
  newTugasAkhir,
  changeTugasAkhir,
  changeStatusTugasAkhir,
} from "../controller/tugasAkhirController.js";

const tugasAkhirRoute = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Tugas Akhir
 *     description: API untuk mengelola data tugas akhir
 */

/**
 * @swagger
 * /tugas-akhir:
 *    get:
 *      summary: Role pengawas tugas akhir
 *      tags: [Tugas Akhir]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Get all data tugas akhir
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/TugasAkhir"
 *        401:
 *         $ref: "#/components/responses/401"
 *        403:
 *         $ref: "#/components/responses/403"
 *        409:
 *         $ref: "#/components/responses/409"
 */
tugasAkhirRoute.get(
  "/tugas-akhir",
  authenticate,
  authorize("pengawas_tugas_akhir"),
  presentTugasAkhir
);

/**
 * @swagger
 * /tugas-akhir/mhs:
 *    get:
 *      summary: Role mahasiswa
 *      tags: [Tugas Akhir]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Get data tugas akhir by id mhs
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/TugasAkhirByMhsId"
 *        401:
 *         $ref: "#/components/responses/401"
 *        403:
 *         $ref: "#/components/responses/403"
 *        409:
 *         $ref: "#/components/responses/409"
 */
tugasAkhirRoute.get(
  "/tugas-akhir/mhs",
  authenticate,
  authorize("mahasiswa"),
  presentTugasAkhirByMhsId
);

/**
 * @swagger
 * /tugas-akhir/mhs/status:
 *    get:
 *      summary: Role mahasiswa
 *      tags: [Tugas Akhir]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Get status tugas akhir mahasiswa
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/StatusTugasAkhirByMhsId"
 *        401:
 *         $ref: "#/components/responses/401"
 *        403:
 *         $ref: "#/components/responses/403"
 *        409:
 *         $ref: "#/components/responses/409"
 */
tugasAkhirRoute.get(
  "/tugas-akhir/mhs/status/",
  authenticate,
  authorize("mahasiswa"),
  presentStatusTugasAkhirByMhsId
);

/**
 * @swagger
 * /tugas-akhir/{id_ta}:
 *    get:
 *      summary: Role administrator dan mahasiswa
 *      tags: [Tugas Akhir]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id_ta
 *          schema:
 *            type: integer
 *          required: true
 *      responses:
 *        200:
 *          description: Get data tugas akhir mahasiswa by id ta
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/TugasAkhirById"
 *        401:
 *         $ref: "#/components/responses/401"
 *        403:
 *         $ref: "#/components/responses/403"
 *        409:
 *         $ref: "#/components/responses/409"
 */
tugasAkhirRoute.get(
  "/tugas-akhir/:id_ta",
  authenticate,
  authorize("mahasiswa", "pengawas_tugas_akhir"),
  presentTugasAkhirById
);

/**
 * @swagger
 * /tugas-akhir:
 *    post:
 *      summary: Role mahasiswa
 *      tags: [Tugas Akhir]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              required: [lembar_persetujuan, lembar_pengesahan, lembar_konsul_1, lembar_konsul_2, lembar_revisi]
 *              properties:
 *                lembar_persetujuan:
 *                  type: string
 *                  format: binary
 *                lembar_pengesahan:
 *                  type: string
 *                  format: binary
 *                lembar_konsul_1:
 *                  type: string
 *                  format: binary
 *                lembar_konsul_2:
 *                  type: string
 *                  format: binary
 *                lembar_revisi:
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
tugasAkhirRoute.post(
  "/tugas-akhir",
  authenticate,
  authorize("mahasiswa"),
  uploadFile,
  newTugasAkhir
);

/**
 * @swagger
 * /tugas-akhir/{id_ta}:
 *    put:
 *      summary: Role mahasiswa
 *      tags: [Tugas Akhir]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id_ta
 *          schema:
 *            type: integer
 *          required: true
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              required: [lembar_persetujuan, lembar_pengesahan, lembar_konsul_1, lembar_konsul_2, lembar_revisi]
 *              properties:
 *                lembar_persetujuan:
 *                  type: string
 *                  format: binary
 *                lembar_pengesahan:
 *                  type: string
 *                  format: binary
 *                lembar_konsul_1:
 *                  type: string
 *                  format: binary
 *                lembar_konsul_2:
 *                  type: string
 *                  format: binary
 *                lembar_revisi:
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
tugasAkhirRoute.put(
  "/tugas-akhir/:id_ta",
  authenticate,
  authorize("mahasiswa"),
  uploadFile,
  changeTugasAkhir
);

/**
 * @swagger
 * /tugas-akhir/status/{id_ta}:
 *    put:
 *      summary: Role pengawas tugas akhir
 *      tags: [Tugas Akhir]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id_ta
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
tugasAkhirRoute.put(
  "/tugas-akhir/status/:id_ta",
  authenticate,
  authorize("pengawas_tugas_akhir"),
  changeStatusTugasAkhir
);

export default tugasAkhirRoute;
