
export interface IApiResponse<T> {
  statusCode: number;
  succeeded: boolean;
  message: string;
  data?: T;
  errors?: any;
  type?: string;
  title?: string;
  traceId?: string;
}
