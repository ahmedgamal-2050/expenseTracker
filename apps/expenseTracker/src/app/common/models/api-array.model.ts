export interface ApiArrayResponse<T> {
  data: T[];
  meta: Meta;
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
}
