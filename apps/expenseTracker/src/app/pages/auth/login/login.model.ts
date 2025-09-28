export interface LoginResponse {
  token: string;
  message: string;
  user: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
}
