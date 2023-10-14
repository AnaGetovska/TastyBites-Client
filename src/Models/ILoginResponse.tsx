export default interface ILoginResponse {
  username: string;
  tokens: {
    token: string;
    refreshToken: string;
  };
  isAdmin: boolean;
}
