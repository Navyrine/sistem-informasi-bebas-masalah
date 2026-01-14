import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import {
  presentProdi,
  presentProdibyId,
  newProdi,
  changeProdi,
  remove,
} from "../controller/prodiController.js";

const prodiRouter = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Prodi
 *     description: API untuk mengelola data prodi
 */

/**
 * @swagger
 * /prodi:
 *    get:
 *      summary: Role administrator
 *      tags: [Prodi]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Get all data prodi
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Prodi"
 *        401:
 *         $ref: "#/components/responses/401"
 *        403:
 *         $ref: "#/components/responses/403"
 *        409:
 *         $ref: "#/components/responses/409"
 */
prodiRouter.get(
  "/prodi",
  authenticate,
  authorize("administrator"),
  presentProdi
);

/**
 * @swagger
 * /prodi/{id_prodi}:
 *    get:
 *      summary: Role administrator
 *      tags: [Prodi]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id_prodi
 *          schema:
 *            type: integer
 *          required: true
 *      responses:
 *        200:
 *          description: Get data prodi by id prodi
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/ProdiById"
 *        401:
 *         $ref: "#/components/responses/401"
 *        403:
 *         $ref: "#/components/responses/403"
 *        409:
 *         $ref: "#/components/responses/409"
 */
prodiRouter.get(
  "/prodi/:id_prodi",
  authenticate,
  authorize("administrator"),
  presentProdibyId
);

/**
 * @swagger
 * /prodi:
 *    post:
 *      summary: Role administrator
 *      tags: [Prodi]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required: [nama_jurusan, nama_prodi]
 *              properties:
 *                nama_jurusan:
 *                  type: string
 *                nama_prodi:
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
prodiRouter.post("/prodi", authenticate, authorize("administrator"), newProdi);

/**
 * @swagger
 * /prodi/{id_prodi}:
 *    put:
 *      summary: Role administrator
 *      tags: [Prodi]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id_prodi
 *          schema:
 *            type: integer
 *          required: true
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required: [nama_jurusan, nama_prodi]
 *              properties:
 *                nama_jurusan:
 *                  type: string
 *                nama_prodi:
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
prodiRouter.put(
  "/prodi/:id_prodi",
  authenticate,
  authorize("administrator"),
  changeProdi
);

/**
 * @swagger
 * /prodi/{id_prodi}:
 *    delete:
 *      summary: Role administrator
 *      tags: [Prodi]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id_prodi
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
prodiRouter.delete(
  "/prodi/:id_prodi",
  authenticate,
  authorize("administrator"),
  remove
);

export default prodiRouter;
