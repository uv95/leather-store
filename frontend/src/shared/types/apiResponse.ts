interface ApiSuccessResponse<T> {
  status: 'success';
  data: T;
}

interface ApiErrorResponse {
  status: 'error';
  message: string;
}

export type ApiResponse<T, S extends 'success' | 'error'> = S extends 'success'
  ? ApiSuccessResponse<T>
  : ApiErrorResponse;
