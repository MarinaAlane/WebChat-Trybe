class ApiErrors extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }

  static badRequest(msg) {
    return new ApiErrors(msg, 400);
  }

  static conflict(msg) {
    return new ApiErrors(msg, 409);
  }

  static unauthorized(msg) {
    return new ApiErrors(msg, 401);
  }

  static notFound(msg) {
    return new ApiErrors(msg, 404);
  }
}

module.exports = ApiErrors;

// ---
// (Overkill) Muita "peso" pra api, sendo q nao estou mudando a propriedade de cada erro.
// O sistema de cima é mais simples, mais "leve" pra api e serve perfeitamente pra o "use case" desse projeto
/*
class BaseError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

class BadRequest extends BaseError {
  constructor(message, status) {
    super(message,status)
  }
}

class Conflict extends BaseError {
  constructor(message, status) {
    super(message,status)
  }
}
*/