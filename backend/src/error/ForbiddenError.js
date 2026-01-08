import CustomError from "./CustomError.js";

class ForbiddenError extends CustomError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

export default ForbiddenError;
