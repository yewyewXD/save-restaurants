export function getStorageAuthState(initialState = { isLoggedIn: false }) {
  if (typeof window !== "undefined") {
    const storedAuthState = localStorage.getItem("AuthState");

    if (!storedAuthState) {
      return initialState;
    }

    const parsedAuthState = JSON.parse(storedAuthState);
    if (new Date().getTime() > parsedAuthState.expiry) {
      localStorage.removeItem("AuthState");
      return initialState;
    } else {
      return parsedAuthState;
    }
  } else {
    return initialState;
  }
}
