export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface IUserRequest {
  name: string;
  email: string;
  password: string;
}
