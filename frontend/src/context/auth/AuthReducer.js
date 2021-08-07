const AuthReducer = (state, { type, payload }) => {
  switch (type) {
    case "SAVE_USER_AUTH":
      return {
        ...state,
        authName: payload.authName,
        authToken: payload.authToken,
      };

    case "CLEAR_USER_AUTH":
      return {
        authName: "",
        authToken: "",
      };

    default:
      return state;
  }
};

export default AuthReducer;
