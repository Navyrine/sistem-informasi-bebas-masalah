import bcrypt from "bcrypt";
import sibema from "../config/sibema.js";
import ConflictError from "../error/ConflictError.js";
import { findMahasiswaId, updateIdAccount } from "../model/mahasiswaModel.js";
import {
  findByUsername,
  addAccount,
  deleteAccount,
} from "../model/authModel.js";
import {
  findToken,
  addRefreshToken,
  deleteRefreshToken,
} from "../model/refreshTokenModel.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../util/handleToken.js";

async function register(nama_mhs, username, email, password, role) {
  const existingUser = await findByUsername(username);
  if (existingUser) {
    throw new ConflictError("Username telah diterdaftar");
  }
  try {
    let user;
    const hash = await bcrypt.hash(password, 12);

    if (role === "mahasiswa") {
      user = await findMahasiswaId(nama_mhs);
      if (!user) {
        throw new ConflictError("Akun mahasiswa tidak ditemukan");
      }

      if (user.id_account !== null) {
        throw new ConflictError("Mahasiswa sudah memiliki account");
      }

      await sibema.query("BEGIN");

      const newAccount = await addAccount(username, email, hash, role);
      await updateIdAccount(newAccount.id_account, user.id_mhs);

      sibema.query("COMMIT");
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

  await addRefreshToken(refreshToken);
  return { accessToken, refreshToken };
}

async function refresh(refreshToken) {
  const storedToken = await findToken(refreshToken);
  if (!storedToken) {
    throw new ConflictError("Refresh token tidak sesuai");
  }

  const decoded = verifyRefreshToken(refreshToken);
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
