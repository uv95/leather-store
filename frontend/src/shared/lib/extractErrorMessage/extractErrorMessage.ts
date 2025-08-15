import { ApiErrorResponse } from '../../types/apiResponse';

export function extractErrorMessage(error: ApiErrorResponse) {
  return error.message;
}
