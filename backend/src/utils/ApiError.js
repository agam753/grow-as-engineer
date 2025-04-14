class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

class ApiErrorResponse {
  constructor(
    statusCode = 500,
    message = "Internal server error",
    success = false,
    errors = []
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.success = success;
    this.errors = errors;
  }
}

export { ApiError, ApiErrorResponse };
