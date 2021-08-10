const AuthReducer = (state, { type, payload }) => {
  switch (type) {
    case "SAVE_USER_AUTH":
      return {
        userInfo: payload.userData,
        isLoggedIn: true,
      };

    case "CLEAR_USER_AUTH":
      return {
        userInfo: null,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};

export default AuthReducer;
