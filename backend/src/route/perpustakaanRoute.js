import express from "express";
import handleFilePerpustakaan from "../middleware/handleFilePerpustakaan.js";
import authenticate from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import {
  presentPerpustakaan,
  presentPerpustakaanById,
  presentStatusPerpustakaanByMhsId,
  presentPerpustakaanByMhsId,
  newPerpustakaan,
  changePerpustakaan,
  changeStatusPerpustakaan,
} from "../controller/perpustakaanController.js";

const perpustakaanRoute = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Perpustakaan
 *     description: API untuk mengelola data perpustakaan
 */

/**
 * @swagger
 * /perpustakaan:
 *    get:
 *      summary: Role pengawas perpustakaan
 *      tags: [Perpustakaan]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Get all data perpustakaan
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Perpustakaan"
 *        401:
 *         $ref: "#/components/responses/401"
 *        403:
 *         $ref: "#/components/responses/403"
 *        409:
 *         $ref: "#/components/responses/409"
 */
perpustakaanRoute.get(
  "/perpustakaan",
  authenticate,
  authorize("pengawas_perpustakaan"),
  presentPerpustakaan
);

/**
 * @swagger
 * /perpustakaan/mhs:
 *    get:
 *      summary: Role mahasiswa
 *      tags: [Perpustakaan]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Get data perpustakaan by id mhs
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/PerpustakaanById"
 *        401:
 *         $ref: "#/components/responses/401"
 *        403:
 *         $ref: "#/components/responses/403"
 *        409:
 *         $ref: "#/components/responses/409"
 */
perpustakaanRoute.get(
  "/perpustakaan/mhs",
  authenticate,
  authorize("mahasiswa"),
  presentPerpustakaanByMhsId
);

/**
 * @swagger
 * /perpustakaan/mhs/status:
 *    get:
 *      summary: Role mahasiswa
 *      tags: [Perpustakaan]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Get status perpustakaan by id mhs
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/StatusPerpustakaanByMhsId"
 *        401:
 *         $ref: "#/components/responses/401"
 *        403:
 *         $ref: "#/components/responses/403"
 *        409:
 *         $ref: "#/components/responses/409"
 */
perpustakaanRoute.get(
  "/perpustakaan/mhs/status",
  authenticate,
  authorize("mahasiswa"),
  presentStatusPerpustakaanByMhsId
);

/**
 * @swagger
 * /perpustakaan/{id_perpus}:
 *    get:
 *      summary: Role mahasiswa dan pengawas perpustakaan
 *      tags: [Perpustakaan]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id_perpus
 *          schema:
 *            type: integer
 *          required: true
 *      responses:
 *        200:
 *          description: Get data perpustakaan by id perpus
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/PerpustakaanById"
 *        401:
 *         $ref: "#/components/responses/401"
 *        403:
 *         $ref: "#/components/responses/403"
 *        409:
 *         $ref: "#/components/responses/409"
 */
perpustakaanRoute.get(
  "/perpustakaan/:id_perpus",
  authenticate,
  authorize("mahasiswa", "pengawas_perpustakaan"),
  presentPerpustakaanById
);

/**
 * @swagger
 * /perpustakaan:
 *    post:
 *      summary: Role mahasiswa
 *      tags: [Perpustakaan]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              required: [dokumen_perpus]
 *              properties:
 *                dokumen_perpus:
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
perpustakaanRoute.post(
  "/perpustakaan",
  authenticate,
  authorize("mahasiswa"),
  handleFilePerpustakaan.single("dokumen_perpus"),
  newPerpustakaan
);

/**
 * @swagger
 * /perpustakaan/{id_perpus}:
 *    put:
 *      summary: Role mahasiswa
 *      tags: [Perpustakaan]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id_perpus
 *          schema:
 *            type: integer
 *          required: true
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              required: [dokumen_perpus]
 *              properties:
 *                dokumen_perpus:
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
perpustakaanRoute.put(
  "/perpustakaan/:id_perpus",
  authenticate,
  authorize("mahasiswa"),
  handleFilePerpustakaan.single("dokumen_perpus"),
  changePerpustakaan
);

/**
 * @swagger
 * /perpustakaan/status/{id_perpus}:
 *    put:
 *      summary: Role pengawas perpustakaan
 *      tags: [Perpustakaan]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id_perpus
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
perpustakaanRoute.put(
  "/perpustakaan/status/:id_perpus",
  authenticate,
  authorize("pengawas_perpustakaan"),
  changeStatusPerpustakaan
);

export default perpustakaanRoute;
