export interface IAuthContextState {
  userInfo: {
    username: string;
  };
  isLoggedIn: boolean;
  expiry: number;

  saveUserAuth: Function;
  clearUserAuth: Function;
}

export interface IAuthResponse {
  user: {
    username: string;
  };
  expiry: number;
}
