import CustomError from "./CustomError.js";

class PermissionError extends CustomError {
  constructor(message = "Permission") {
    super(message, 403);
  }
}

export default PermissionError;
