import bcrypt from "bcrypt";
import ConflictError from "../error/ConflictError.js";
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

async function register(username, email, password, role) {
  const existingUser = await findByUsername(username);
  if (existingUser) {
    throw new ConflictError("Username telah diterdaftar");
  }

  const hash = await bcrypt.hash(password, 12);
  await addAccount(username, email, hash, role);
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
