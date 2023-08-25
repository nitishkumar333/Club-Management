import { createContext, useContext, useReducer } from "react";

const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { userId: action.userId, token: action.token, isAuth: true };
    case "LOGOUT":
      return { userId: null, token: null, isAuth: false };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatchAuth] = useReducer(authReducer, {
    isAuth: localStorage.getItem("isAuth"),
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("userId"),
  });
  return (
    <authContext.Provider value={{ ...state, dispatchAuth }}>
      {children}
    </authContext.Provider>
  );
};
