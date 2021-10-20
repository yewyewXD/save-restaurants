import { IReducerAction, IActionTypes } from "./types";

const AuthReducer = (state: any, { type, payload }: IReducerAction) => {
  switch (type) {
    case IActionTypes.SAVE:
      return {
        userInfo: payload?.user,
        isLoggedIn: true,
        expiry: payload?.expiry,
      };

    case IActionTypes.CLEAR:
      return {
        userInfo: {
          username: "",
        },
        isLoggedIn: false,
        expiry: 0,
      };

    default:
      return state;
  }
};

export default AuthReducer;
