export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

export type ICreateUser = Omit<IUser, 'id' | 'created_at' | 'updated_at'>;

export type IUserRequest = IUser & {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};

export type IUpdateUser = Omit<IUser, 'id' | 'created_at' | 'updated_at'>;
