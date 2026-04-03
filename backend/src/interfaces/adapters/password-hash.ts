export interface IPasswordHashAdapter {
  execute(password: string): Promise<string>;
}
