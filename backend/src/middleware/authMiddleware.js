import CredentialError from "../error/CredentialError.js";
import { verifyAccessToken } from "../util/handleToken.js";

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new CredentialError("Authorization header diperlukan");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new CredentialError("Token diperlukan");
  }

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    throw new CredentialError("Token tidak berlaku");
  }
}

export default authenticate;
