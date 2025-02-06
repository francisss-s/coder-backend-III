class CustomError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.name = this.constructor.name;
      this.statusCode = statusCode;
      Error.captureStackTrace(this, this.constructor);
    }
  
    static create({ message, statusCode }) {
      return new CustomError(message, statusCode);
    }
  }
  
  export default CustomError;