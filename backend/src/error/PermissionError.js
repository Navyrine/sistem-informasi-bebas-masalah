import CustomError from "./CustomError";

class PermissionError extends CustomError {
  constructor(message = "Permission") {
    super(message, 403);
  }
}

export default PermissionError;
