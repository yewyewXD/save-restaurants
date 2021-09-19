const AuthReducer = (state, { type, payload }) => {
  switch (type) {
    case "SAVE_USER_AUTH":
      return {
        userInfo: payload.user,
        isLoggedIn: true,
        expiry: payload.expiry,
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
