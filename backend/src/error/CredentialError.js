import CustomError from "./CustomError";

class CredentialError {
  constructor(message = "Credential") {
    super(message, 401);
  }
}

export default CredentialError;
