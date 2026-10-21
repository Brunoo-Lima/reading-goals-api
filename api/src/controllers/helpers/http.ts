export const badRequest = <T>(body: T) => ({
  statusCode: 400,
  body,
});

export const serverError = () => ({
  statusCode: 500,
  body: {
    code: 'INTERNAL_ERROR',
    message: 'Internal server error',
  },
});

export const externalServiceUnavailable = () => ({
  statusCode: 502,
  body: {
    code: 'EXTERNAL_ERROR',
    message: 'External service unavailable',
  },
});

export const ok = <T>(body: T) => ({
  statusCode: 200,
  body,
});

export const created = <T>(body: T) => ({
  statusCode: 201,
  body,
});

export const noContent = () => ({
  statusCode: 204,
  body: {},
});

export const notFound = <T>(body: T) => ({
  statusCode: 404,
  body,
});

export const unauthorized = () => ({
  statusCode: 401,
  body: {
    code: 'UNAUTHORIZED',
    message: 'Unauthorized',
  },
});

export const forbidden = () => ({
  statusCode: 403,
  body: {
    code: 'FORBIDDEN',
    message: 'Forbidden',
  },
});
