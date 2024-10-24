import { useReducer, useContext, createContext } from "react";

const initialState = {
  isUserAuthenticated: false,
  user: null,
  token: null,
};

const ACTIONS = {
  LOGIN_USER: "LOGIN_USER",
  LOGOUT_USER: "LOGOUT_USER",
};

const authReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN_USER:
      return {
        isUserAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case ACTIONS.LOGOUT_USER:
      return initialState;
    default:
        return state
  }
};

const UserAuthenticationContext = createContext();

export const UserAuthenticationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <UserAuthenticationContext.Provider value={{ state, dispatch }}>
      {children}
    </UserAuthenticationContext.Provider>
  );
};
export const useAuthentication = () => {
  return useContext(UserAuthenticationContext);
};

export {ACTIONS}
