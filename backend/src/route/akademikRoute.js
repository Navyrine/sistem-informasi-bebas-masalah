import express from "express";
import handleFileAkademik from "../middleware/handleFileAkademik.js";
import authenticate from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import {
  presentAkademik,
  presentAkademikById,
  presentStatusAkademikByMhsId,
  presentAkademikByMhsId,
  newAkademik,
  changeAkademik,
  changeStatusAkademik,
} from "../controller/akademikController.js";

const akademikRoute = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Akademik
 *     description: API untuk mengelola data akademik
 */

/**
 * @swagger
 * /akademik:
 *    get:
 *      summary: Role pengawas akademik
 *      tags: [Akademik]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Get all data akademik
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Akademik"
 *        401:
 *         $ref: "#/components/responses/401"
 *        403:
 *         $ref: "#/components/responses/403"
 *        409:
 *         $ref: "#/components/responses/409"
 */
akademikRoute.get(
  "/akademik",
  authenticate,
  authorize("pengawas_akademik"),
  presentAkademik
);

/**
 * @swagger
 * /akademik/mhs:
 *    get:
 *      summary: Role mahasiswa
 *      tags: [Akademik]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Get data akademik by id mhs
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/AkademikById"
 *        401:
 *         $ref: "#/components/responses/401"
 *        403:
 *         $ref: "#/components/responses/403"
 *        409:
 *         $ref: "#/components/responses/409"
 */
akademikRoute.get(
  "/akademik/mhs",
  authenticate,
  authorize("mahasiswa"),
  presentAkademikByMhsId
);

/**
 * @swagger
 * /akademik/mhs/status:
 *    get:
 *      summary: Role mahasiswa
 *      tags: [Akademik]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Get status akademik by id mhs
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/StatusAkademikByMhsId"
 *        401:
 *         $ref: "#/components/responses/401"
 *        403:
 *         $ref: "#/components/responses/403"
 *        409:
 *         $ref: "#/components/responses/409"
 */
akademikRoute.get(
  "/akademik/mhs/status",
  authenticate,
  authorize("mahasiswa"),
  presentStatusAkademikByMhsId
);

/**
 * @swagger
 * /akademik/{id_akademik}:
 *    get:
 *      summary: Role mahasiswa dan pengawas akademik
 *      tags: [Akademik]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id_akademik
 *          schema:
 *            type: integer
 *          required: true
 *      responses:
 *        200:
 *          description: Get data akademik by id akademik
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/AkademikById"
 *        401:
 *         $ref: "#/components/responses/401"
 *        403:
 *         $ref: "#/components/responses/403"
 *        409:
 *         $ref: "#/components/responses/409"
 */
akademikRoute.get(
  "/akademik/:id_akademik",
  authenticate,
  authorize("mahasiswa", "pengawas_akademik"),
  presentAkademikById
);

/**
 * @swagger
 * /akademik:
 *    post:
 *      summary: Role mahasiswa
 *      tags: [Akademik]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              required: [khs_sem_1, khs_sem_2, khs_sem_3, khs_sem_4, khs_sem_5, khs_sem_6, lembar_sp]
 *              properties:
 *                khs_sem_1:
 *                  type: string
 *                  format: binary
 *                khs_sem_2:
 *                  type: string
 *                  format: binary
 *                khs_sem_3:
 *                  type: string
 *                  format: binary
 *                khs_sem_4:
 *                  type: string
 *                  format: binary
 *                khs_sem_5:
 *                  type: string
 *                  format: binary
 *                khs_sem_6:
 *                  type: string
 *                  format: binary
 *                lembar_sp:
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
akademikRoute.post(
  "/akademik",
  authenticate,
  authorize("mahasiswa"),
  handleFileAkademik,
  newAkademik
);

/**
 * @swagger
 * /akademik/{id_akademik}:
 *    put:
 *      summary: Role mahasiswa
 *      tags: [Akademik]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id_akademik
 *          schema:
 *            type: integer
 *          required: true
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              required: [khs_sem_1, khs_sem_2, khs_sem_3, khs_sem_4, khs_sem_5, khs_sem_6, lembar_sp]
 *              properties:
 *                khs_sem_1:
 *                  type: string
 *                  format: binary
 *                khs_sem_2:
 *                  type: string
 *                  format: binary
 *                khs_sem_3:
 *                  type: string
 *                  format: binary
 *                khs_sem_4:
 *                  type: string
 *                  format: binary
 *                khs_sem_5:
 *                  type: string
 *                  format: binary
 *                khs_sem_6:
 *                  type: string
 *                  format: binary
 *                lembar_sp:
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
akademikRoute.put(
  "/akademik/:id_akademik",
  authenticate,
  authorize("mahasiswa"),
  handleFileAkademik,
  changeAkademik
);

/**
 * @swagger
 * /akademik/status/{id_akademik}:
 *    put:
 *      summary: Role pengawas akademik
 *      tags: [Akademik]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id_akademik
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
akademikRoute.put(
  "/akademik/status/:id_akademik",
  authenticate,
  authorize("pengawas_akademik"),
  changeStatusAkademik
);

export default akademikRoute;
