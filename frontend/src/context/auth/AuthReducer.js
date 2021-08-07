const AuthReducer = (state, { type, payload }) => {
  switch (type) {
    case "SAVE_USER_AUTH":
      return state;

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
