import CredentialError from "../error/CredentialError.js";
import ForbiddenError from "../error/ForbiddenError.js";

function authorize(...allowedRole) {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      throw new CredentialError("User tidak terautentikasi");
    }

    if (!allowedRole.includes(req.user.role)) {
      throw new ForbiddenError("Akses ditolak: role tidak diperbolehkan");
    }

    next();
  };
}

export default authorize;
