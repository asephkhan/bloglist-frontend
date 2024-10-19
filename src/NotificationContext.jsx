import { useReducer, useContext, createContext } from "react";

const initialState = {
  messsage: null,
  type: null, // error or success
};

const ACTIONS = {
  SET_NOTIFICATION: "SET_NOTIFICATION",
  CLEAR_NOTIFICATION: "CLEAR_NOTIFICATION",
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_NOTIFICATION:
      return { message: action.payload.message, type: action.payload.type };
    case ACTIONS.CLEAR_NOTIFICATION:
      return { message: null, type: null };
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(notificationReducer, {
        message: null,
        type: null,
      });

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
