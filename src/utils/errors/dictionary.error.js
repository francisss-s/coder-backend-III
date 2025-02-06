const BAD_REQUEST =  { message: "Bad Request", statusCode: 400 }
const UNAUTHORIZED =  { message: "Unauthorized", statusCode: 401 }
const FORBIDDEN =  { message: "Forbidden", statusCode: 403 }
const NOT_FOUND = { message: "Not Found", statusCode: 404 }
const CONFLICT = { message: "Conflict", statusCode: 409 }
const UNPROCESSABLE_ENTITY = { message: "Unprocessable Entity", statusCode: 422 }
const INTERNAL_SERVER_ERROR = { message: "Internal Server Error", statusCode: 500 }
const SERVICE_UNAVAILABLE = { message: "Service Unavailable", statusCode: 503 }

export {BAD_REQUEST, UNAUTHORIZED, FORBIDDEN, NOT_FOUND, CONFLICT, UNPROCESSABLE_ENTITY, INTERNAL_SERVER_ERROR, SERVICE_UNAVAILABLE}