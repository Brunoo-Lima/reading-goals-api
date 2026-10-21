export interface ApiErrorResponse {
  code?: string;
  message?: string;
}

export class ApiError extends Error {
  public code: string;
  public status?: number;

  constructor(code: string, message?: string, status?: number) {
    super(message);

    this.name = 'ApiError';
    this.code = code;
    this.status = status;
  }
}
