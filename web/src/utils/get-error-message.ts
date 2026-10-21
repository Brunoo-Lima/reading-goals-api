import { ApiError } from '@/@types/IApiErrorResponse';
import { apiErrorMessages, messages } from '@/constants/messages';

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return apiErrorMessages[error.code] ?? messages.error.generic;
  }

  if (error instanceof Error) {
    return error.message || messages.error.generic;
  }

  return messages.error.generic;
}
