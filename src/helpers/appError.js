class AppError {
  constructor(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
  }
}

export default AppError;
