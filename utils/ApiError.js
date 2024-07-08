class ApiError extends Error {
  constructor(statusCode, message) {
    // Passing the error message to Error class also
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.success = statusCode >= 400 && statusCode < 500 ? "fail" : "error";

    Error.captureStackTrace(this, this.constructor); //current object and ApiError class
  }
}

module.exports = ApiError;
