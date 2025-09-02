import { AxiosError } from 'axios';
import { ApiErrorResponse } from '../../types/apiResponse';

export function extractErrorMessage(error: ApiErrorResponse | AxiosError) {
  if (error instanceof AxiosError) {
    return (error.response?.data as ApiErrorResponse).message || 'Something went wrong!';
  }

  return error.message;
}
