import CustomError from "./CustomError.js";

class InternalServerError extends CustomError {
  constructor(message = "InternalServer") {
    super(message, 500);
  }
}

export default InternalServerError;
