export default interface IUser {
  name: string;
  email: string;
  password_hash?: string;
  refresh_token: string;
}
