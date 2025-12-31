import CustomError from "./CustomError";

class ConflictError extends CustomError {
  constructor(message = "Conflict") {
    super(message, 409);
  }
}

export default ConflictError;
