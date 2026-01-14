import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.4",
    info: {
      title: "Dokumentasi API Sistem Informasi Bebas Masalah",
      version: "0.1.9",
      description: "",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "refreshToken",
        },
      },
      schemas: {
        AuthResponse: {
          type: "object",
          properties: {
            access_token: {
              type: "string",
            },
          },
        },
        Mahasiswa: {
          type: "object",
          properties: {
            id_mhs: { type: "integer" },
            id_account: { type: "integer" },
            nama_prodi: { type: "string" },
            nim: { type: "string" },
            nama_mhs: { type: "string" },
            no_telp: { type: "string" },
            alamat: { type: "string" },
            tahun_lulus: { type: "string" },
            status: { type: "string" },
          },
        },
        Pegawai: {
          type: "object",
          properties: {
            id_pegawai: { type: "integer" },
            id_account: { type: "integer" },
            nama_pegawai: { type: "string" },
            no_telp: { type: "string" },
            alamat: { type: "string" },
          },
        },
        Jurusan: {
          type: "object",
          properties: {
            id_jurusan: { type: "integer" },
            nama_jurusan: { type: "string" },
          },
        },
        Prodi: {
          type: "object",
          properties: {
            id_prodi: { type: "integer" },
            nama_jurusan: { type: "string" },
            nama_prodi: { type: "string" },
          },
        },
        ProdiById: {
          type: "object",
          properties: {
            id_prodi: { type: "integer" },
            id_jurusan: { type: "integer" },
            nama_jurusan: { type: "string" },
            nama_prodi: { type: "string" },
          },
        },
        Berita: {
          type: "object",
          properties: {
            id_berita: { type: "integer" },
            id_pegawai: { type: "integer" },
            nama_pegawai: { type: "string" },
            judul: { type: "string" },
            content: { type: "string" },
            gambar: { type: "string" },
          },
        },
        TugasAkhir: {
          type: "object",
          properties: {
            id_ta: { type: "integer" },
            id_mhs: { type: "integer" },
            nama_mhs: { type: "string" },
            lembar_persetujuan: { type: "string" },
            lembar_pengesahan: { type: "string" },
            lembar_konsul_1: { type: "string" },
            lembar_konsul_2: { type: "string" },
            lembar_revisi: { type: "string" },
            rincian: { type: "string" },
            status: { type: "string" },
          },
        },
        TugasAkhirById: {
          type: "object",
          properties: {
            id_ta: { type: "integer" },
            id_pegawai: { type: "integer" },
            id_mhs: { type: "integer" },
            nama_pegawai: { type: "string" },
            nama_mhs: { type: "string" },
            lembar_persetujuan: { type: "string" },
            lembar_pengesahan: { type: "string" },
            lembar_konsul_1: { type: "string" },
            lembar_konsul_2: { type: "string" },
            lembar_revisi: { type: "string" },
            rincian: { type: "string" },
            status: { type: "string" },
          },
        },
        TugasAkhirByMhsId: {
          type: "object",
          properties: {
            id_ta: { type: "integer" },
            id_pegawai: { type: "integer" },
            id_mhs: { type: "integer" },
            nama_pegawai: { type: "string" },
            lembar_persetujuan: { type: "string" },
            lembar_pengesahan: { type: "string" },
            lembar_konsul_1: { type: "string" },
            lembar_konsul_2: { type: "string" },
            lembar_revisi: { type: "string" },
            rincian: { type: "string" },
            status: { type: "string" },
          },
        },
        StatusTugasAkhirByMhsId: {
          type: "object",
          properties: {
            id_ta: { type: "integer" },
            status: { type: "string" },
          },
        },
        Keuangan: {
          type: "object",
          properties: {
            id_keuangan: { type: "integer" },
            id_mhs: { type: "integer" },
            nama_mhs: { type: "string" },
            dokumen_keuangan: { type: "string" },
            rincian: { type: "string" },
            status: { type: "string" },
          },
        },
        KeuanganById: {
          type: "object",
          properties: {
            id_keuangan: { type: "integer" },
            id_pegawai: { type: "integer" },
            id_mhs: { type: "integer" },
            nama_pegawai: { type: "string" },
            nama_mhs: { type: "string" },
            dokumen_keuangan: { type: "string" },
            rincian: { type: "string" },
            status: { type: "string" },
          },
        },
        StatusKeuanganByMhsId: {
          type: "object",
          properties: {
            id_keuangan: { type: "integer" },
            status: { type: "string" },
          },
        },
        Perpustakaan: {
          type: "object",
          properties: {
            id_perpus: { type: "integer" },
            id_mhs: { type: "integer" },
            nama_mhs: { type: "string" },
            dokumen_perpus: { type: "string" },
            rincian: { type: "string" },
            status: { type: "string" },
          },
        },
        PerpustakaanById: {
          type: "object",
          properties: {
            id_perpus: { type: "integer" },
            id_pegawai: { type: "integer" },
            id_mhs: { type: "integer" },
            nama_pegawai: { type: "string" },
            nama_mhs: { type: "string" },
            dokumen_perpus: { type: "string" },
            rincian: { type: "string" },
            status: { type: "string" },
          },
        },
        StatusPerpustakaanByMhsId: {
          type: "object",
          properties: {
            id_perpus: { type: "integer" },
            status: { type: "string" },
          },
        },
        Akademik: {
          type: "object",
          properties: {
            id_perpus: { type: "integer" },
            id_mhs: { type: "integer" },
            nama_mhs: { type: "string" },
            khs_sem_1: { type: "string" },
            khs_sem_2: { type: "string" },
            khs_sem_3: { type: "string" },
            khs_sem_4: { type: "string" },
            khs_sem_5: { type: "string" },
            khs_sem_6: { type: "string" },
            lembar_sp: { type: "string" },
            rincian: { type: "string" },
            status: { type: "string" },
          },
        },
        AkademikById: {
          type: "object",
          properties: {
            id_perpus: { type: "integer" },
            id_pegawai: { type: "integer" },
            id_mhs: { type: "integer" },
            nama_mhs: { type: "string" },
            nama_pegawai: { type: "string" },
            khs_sem_1: { type: "string" },
            khs_sem_2: { type: "string" },
            khs_sem_3: { type: "string" },
            khs_sem_4: { type: "string" },
            khs_sem_5: { type: "string" },
            khs_sem_6: { type: "string" },
            lembar_sp: { type: "string" },
            rincian: { type: "string" },
            status: { type: "string" },
          },
        },
        StatusAkademikByMhsId: {
          type: "object",
          properties: {
            id_perpus: { type: "integer" },
            id_mhs: { type: "integer" },
            nama_mhs: { type: "string" },
            rincian: { type: "string" },
            status: { type: "string" },
          },
        },
      },
      responses: {
        200: {
          description: "OK",
        },
        400: {
          description: "Bad Request",
        },
        401: {
          description: "Unauthorized",
        },
        403: {
          description: "Forbidden",
        },
        409: {
          description: "Conflict",
        },
        500: {
          description: "Internal Server",
        },
      },
    },
  },
  apis: ["./src/route/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
