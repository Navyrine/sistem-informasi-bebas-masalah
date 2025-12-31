import CustomError from "../error/CustomError";

function errorHandler(err, req, res, next) {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }

  console.log(`UNEXPECTED ERROR: ${err}`);
}

export default errorHandler;
