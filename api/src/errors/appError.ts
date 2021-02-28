export class AppError {
  public readonly message: string;
  public readonly statusCode: number;

  // deixando como default o statusCode 400
  constructor(message: string, statusCode: number = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
