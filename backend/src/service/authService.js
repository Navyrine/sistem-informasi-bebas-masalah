import bcrypt from "bcrypt";
import sibema from "../config/sibema.js";
import ConflictError from "../error/ConflictError.js";
import { findMahasiswaId, updateIdAccount } from "../model/mahasiswaModel.js";
import { getPegawaiId, updateAccountId } from "../model/pegawaiModel.js";
import { findByUsername, addAccount } from "../model/authModel.js";
import {
  findToken,
  addRefreshToken,
  deleteRefreshToken,
} from "../model/refreshTokenModel.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../util/handleToken.js";

async function register(nama, username, email, password, role) {
  const existingUser = await findByUsername(username);
  if (existingUser) {
    throw new ConflictError("Username telah diterdaftar");
  }
  try {
    let user;
    const hash = await bcrypt.hash(password, 12);

    if (role === "mahasiswa") {
      user = await findMahasiswaId(nama);
      if (!user) {
        throw new ConflictError("Akun mahasiswa tidak ditemukan");
      }

      if (user.id_account !== null && user.id_account !== undefined) {
        throw new ConflictError("Mahasiswa sudah memiliki account");
      }

      await sibema.query("BEGIN");

      const newAccountMhs = await addAccount(username, email, hash, role);
      await updateIdAccount(newAccountMhs.id_account, user.id_mhs);

      await sibema.query("COMMIT");
    } else {
      user = await getPegawaiId(nama);
      if (!user) {
        throw new ConflictError("Akun pegawai tidak ditemukan");
      }

      if (user.id_account !== null && user.id_account !== undefined) {
        throw new ConflictError("Pegawai sudah memiliki akun");
      }

      await sibema.query("BEGIN");

      const newAccountPegawai = await addAccount(username, email, hash, role);
      await updateAccountId(newAccountPegawai.id_account, user.id_pegawai);

      await sibema.query("COMMIT");
    }
  } catch (err) {
    console.log(err);
    await sibema.query("ROLLBACK");
    throw err;
  }
}

async function login(username, password) {
  const existingUser = await findByUsername(username);
  if (!existingUser) {
    throw new ConflictError("Username atau password tidak diterdaftar");
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) {
    throw new ConflictError("Akun tidak terdaftar");
  }

  const payload = { id: existingUser.id_account, role: existingUser.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  await addRefreshToken(existingUser.id_account, refreshToken);
  return { accessToken, refreshToken };
}

async function refresh(refreshToken) {
  const storedToken = await findToken(refreshToken);
  if (!storedToken) {
    throw new ConflictError("Refresh token tidak sesuai");
  }

  const decoded = verifyRefreshToken(refreshToken);
  console.log(decoded);
  const newAccessToken = generateAccessToken({
    id: decoded.id,
    role: decoded.role,
  });

  return { newAccessToken };
}

async function logout(refreshToken) {
  if (!refreshToken) {
    throw new ConflictError("Token wajib diisi");
  }

  await deleteRefreshToken(refreshToken);
}

export { register, login, refresh, logout };
