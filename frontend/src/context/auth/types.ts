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

export enum IActionTypes {
  SAVE = "SAVE_USER_AUTH",
  CLEAR = "CLEAR_USER_AUTH",
}

export interface IReducerAction {
  type: IActionTypes.SAVE | IActionTypes.CLEAR;
  payload: {
    user: {
      username: string;
    };
    expiry: number;
  } | null;
}
