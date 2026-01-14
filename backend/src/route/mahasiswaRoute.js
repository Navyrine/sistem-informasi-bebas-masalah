import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import {
  presentMahsiswa,
  presentMahsiswaById,
  presentProfileMahasiswa,
  newMahasiswa,
  changeMahasiswa,
  remove,
} from "../controller/mahasiswaController.js";

const mahasiswaRouter = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Mahasiswa
 *     description: API untuk mengelola data mahasiswa
 */

/**
 * @swagger
 * /mahasiswa:
 *    get:
 *      summary: Role administrator
 *      tags: [Mahasiswa]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Get all data mahasiswa
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Mahasiswa"
 *        401:
 *         $ref: "#/components/responses/401"
 *        403:
 *         $ref: "#/components/responses/403"
 *        409:
 *         $ref: "#/components/responses/409"
 */
mahasiswaRouter.get(
  "/mahasiswa",
  authenticate,
  authorize("administrator"),
  presentMahsiswa
);

/**
 * @swagger
 * /mahasiswa/profile:
 *    get:
 *      summary: Role mahasiswa
 *      tags: [Mahasiswa]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Get data mahasiswa by id mhs
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Mahasiswa"
 *        401:
 *         $ref: "#/components/responses/401"
 *        403:
 *         $ref: "#/components/responses/403"
 *        409:
 *         $ref: "#/components/responses/409"
 */
mahasiswaRouter.get(
  "/mahasiswa/profile",
  authenticate,
  authorize("mahasiswa"),
  presentProfileMahasiswa
);

/**
 * @swagger
 * /mahasiswa/{id_mhs}:
 *    get:
 *      summary: Role administrator
 *      tags: [Mahasiswa]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id_mhs
 *          schema:
 *            type: integer
 *          required: true
 *      responses:
 *        200:
 *          description: Get data mahasiswa by id mhs
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Mahasiswa"
 *        401:
 *         $ref: "#/components/responses/401"
 *        403:
 *         $ref: "#/components/responses/403"
 *        409:
 *         $ref: "#/components/responses/409"
 */
mahasiswaRouter.get(
  "/mahasiswa/:id_mhs",
  authenticate,
  authorize("administrator"),
  presentMahsiswaById
);

/**
 * @swagger
 * /mahasiswa:
 *    post:
 *      summary: Role administrator
 *      tags: [Mahasiswa]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required: [nim, nama_prodi, nama_mhs, no_telp, alamat, tahun_lulus]
 *              properties:
 *                nim:
 *                  type: string
 *                nama_prodi:
 *                  type: string
 *                nama_mhs:
 *                  type: string
 *                no_telp:
 *                  type: string
 *                alamat:
 *                  type: string
 *                tahun_lulus:
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
mahasiswaRouter.post(
  "/mahasiswa",
  authenticate,
  authorize("administrator"),
  newMahasiswa
);

/**
 * @swagger
 * /mahasiswa/{id_mhs}:
 *    put:
 *      summary: Role administrator
 *      tags: [Mahasiswa]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id_mhs
 *          schema:
 *            type: integer
 *          required: true
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required: [nim, nama_prodi, nama_mhs, no_telp, alamat, tahun_lulus]
 *              properties:
 *                nim:
 *                  type: string
 *                nama_prodi:
 *                  type: string
 *                nama_mhs:
 *                  type: string
 *                no_telp:
 *                  type: string
 *                alamat:
 *                  type: string
 *                tahun_lulus:
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
mahasiswaRouter.put(
  "/mahasiswa/:id_mhs",
  authenticate,
  authorize("administrator"),
  changeMahasiswa
);

/**
 * @swagger
 * /mahasiswa/{id_mhs}:
 *    delete:
 *      summary: Role administrator
 *      tags: [Mahasiswa]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id_mhs
 *          schema:
 *            type: integer
 *          required: true
 *      responses:
 *        200:
 *          $ref: "#/components/responses/200"
 *        401:
 *         $ref: "#/components/responses/401"
 *        403:
 *         $ref: "#/components/responses/403"
 *        409:
 *         $ref: "#/components/responses/409"
 */
mahasiswaRouter.delete(
  "/mahasiswa/:id_mhs",
  authenticate,
  authorize("administrator"),
  remove
);

export default mahasiswaRouter;
