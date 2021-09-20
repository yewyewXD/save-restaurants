interface action {
  type: "SAVE_USER_AUTH" | "CLEAR_USER_AUTH";
  payload: {
    user: {
      username: string;
    };
    expiry: number;
  } | null;
}

const AuthReducer = (state: any, { type, payload }: action) => {
  switch (type) {
    case "SAVE_USER_AUTH":
      return {
        userInfo: payload?.user,
        isLoggedIn: true,
        expiry: payload?.expiry,
      };

    case "CLEAR_USER_AUTH":
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
