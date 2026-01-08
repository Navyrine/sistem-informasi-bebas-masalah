import BadRequestError from "../error/BadRequestError.js";
import { register, login, refresh, logout } from "../service/authService.js";

async function registerAccount(req, res, next) {
  try {
    let { nama, username, email, password, role } = req.body;

    if (!nama) {
      throw new BadRequestError("Nama tidak boleh kosong");
    }

    if (!username) {
      throw new BadRequestError("Username tidak boleh kosong");
    }

    if (!email) {
      throw new BadRequestError("Email tidak boleh kosong");
    }

    if (!password) {
      throw new BadRequestError("Password tidak boleh kosong");
    }

    if (!role) {
      throw new BadRequestError("Role tidak boleh kosong");
    }

    nama = nama.toLowerCase().trim();
    username = username.trim();
    email = email.trim();
    password = password.trim();
    role = role.toLowerCase().trim();

    await register(nama, username, email, password, role);
    return res
      .status(201)
      .json({ status: 201, message: "Berhasil membuat akun" });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function loginAccount(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username) {
      throw new BadRequestError("Username tidak boleh kosong");
    }
    if (!password) {
      throw new BadRequestError("Password tidak boleh kosong");
    }

    const { accessToken, refreshToken } = await login(username, password);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: parseInt(process.env.MAX_AGE_COOKIE),
    });

    return res.status(200).json({ status: 200, access_token: accessToken });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function refreshToken(req, res, next) {
  try {
    const refreshToken = req.cookies.refreshToken;
    const accessToken = await refresh(refreshToken);

    return res.status(200).json({ status: 200, accessToken });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function logoutAccount(req, res, next) {
  try {
    const refreshToken = req.cookies.refreshToken;

    await logout(refreshToken);
    if (req.cookies.refreshToken) {
      res.clearCookie("refreshToken");
    }

    return res.status(201).json({ status: 201, message: "Berhasil logout" });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { registerAccount, loginAccount, refreshToken, logoutAccount };
