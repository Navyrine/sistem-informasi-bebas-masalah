# About

Sistem Informasi Bebas Masalah adalah sebuah sistem yang digunakan untuk mengelola status bebas masalah pada mahasiswa dengan melibatkan 6 role yang bertanggung jawab pada bidangnya masing-masing. Role tersebut, yaitu:

- Administrator
- Mahasiswa
- Pengawas Tugas Akhir
- Pengawas Keuangan
- Pengawas Perpustakaan
- Pengawas Akademik

Project ini berfokus pada pembuatan backend menggunakan expressJS/nodeJS dan database postgresql.

## Setup Environment

```
JWT_ACCESS_SECRET="....."
JWT_REFRESH_SECRET="....."
JWT_ACCESS_EXPIRES="....."
JWT_REFRESH_EXPIRES="....."
MAX_AGE_COOKIE="....."
PG_USER="....."
PG_HOST="....."
PG_DATABASE="....."
PG_PASSWORD="....."
PG_PORT="....."
MAX_AGE_COOKIE="....."
SALT_ROUND="....."
```

## Alur Awal

Buat terlebih dahulu data pegawai, data mahasiswa, dan data akun dengan role administrator secara manual pada database dan password yang disimpan merupakan password yang telah dibcrypt. Setelah data awal tersebut selesai dibuat silahkan gunakan api berdasarkan dokumentasi di **/api-docs**
