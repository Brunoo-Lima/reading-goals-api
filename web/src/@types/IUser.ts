export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export type IUserRequest = IUser & {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};
