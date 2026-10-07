export class DomainException extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class TodoNotFoundException extends DomainException {
  constructor(id: string) {
    super(`Todo with ID '${id}' was not found.`, 404);
  }
}

export class TodoValidationException extends DomainException {
  constructor(message: string) {
    super(message, 400);
  }
}

export class DuplicateTodoException extends DomainException {
  constructor(title: string) {
    super(`Todo with title '${title}' already exists.`, 409);
  }
}
