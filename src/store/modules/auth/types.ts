export interface Credentials {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
}

export interface AuthState {
  user: Partial<User>;
  loading: boolean;
}

export interface AuthResult {
  message: string;
  user: User;
  token: string;
}
