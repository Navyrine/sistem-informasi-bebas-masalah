import express from "express";
import imageHandle from "../middleware/imageHandle.js";
import authenticate from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import {
  presentBerita,
  presentBeritaById,
  newBerita,
  changeBerita,
  remove,
} from "../controller/beritaController.js";

const beritaRoute = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Berita
 *     description: API untuk mengelola data berita
 */

/**
 * @swagger
 * /berita:
 *    get:
 *      summary: Role administrator
 *      tags: [Berita]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Get all data berita
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Berita"
 *        401:
 *         $ref: "#/components/responses/401"
 *        403:
 *         $ref: "#/components/responses/403"
 *        409:
 *         $ref: "#/components/responses/409"
 */
beritaRoute.get(
  "/berita",
  authenticate,
  authorize("administrator"),
  presentBerita
);

/**
 * @swagger
 * /berita/{id_berita}:
 *    get:
 *      summary: Role administrator
 *      tags: [Berita]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id_berita
 *          schema:
 *            type: integer
 *          required: true
 *      responses:
 *        200:
 *          description: Get data berita by id berita
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Berita"
 *        401:
 *         $ref: "#/components/responses/401"
 *        403:
 *         $ref: "#/components/responses/403"
 *        409:
 *         $ref: "#/components/responses/409"
 */
beritaRoute.get(
  "/berita/:id_berita",
  authenticate,
  authorize("administrator"),
  presentBeritaById
);

/**
 * @swagger
 * /berita:
 *    post:
 *      summary: Role administrator
 *      tags: [Berita]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              required: [judul, konten, gambar]
 *              properties:
 *                judul:
 *                  type: string
 *                konten:
 *                  type: string
 *                gambar:
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
beritaRoute.post(
  "/berita",
  authenticate,
  authorize("administrator"),
  imageHandle.single("gambar"),
  newBerita
);

/**
 * @swagger
 * /berita/{id_berita}:
 *    put:
 *      summary: Role administrator
 *      tags: [Berita]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id_berita
 *          schema:
 *            type: integer
 *          required: true
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              required: [judul, konten, gambar]
 *              properties:
 *                judul:
 *                  type: string
 *                konten:
 *                  type: string
 *                gambar:
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
beritaRoute.put(
  "/berita/:id_berita",
  authenticate,
  authorize("administrator"),
  imageHandle.single("gambar"),
  changeBerita
);

/**
 * @swagger
 * /berita/{id_berita}:
 *    delete:
 *      summary: Role administrator
 *      tags: [Berita]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id_berita
 *          schema:
 *            type: integer
 *          required: true
 *      responses:
 *        200:
 *          $ref: "#components/responses/200"
 *        401:
 *         $ref: "#/components/responses/401"
 *        403:
 *         $ref: "#/components/responses/403"
 *        409:
 *         $ref: "#/components/responses/409"
 */
beritaRoute.delete(
  "/berita/:id_berita",
  authenticate,
  authorize("administrator"),
  remove
);

export default beritaRoute;
