export interface ApiResponse<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
}
