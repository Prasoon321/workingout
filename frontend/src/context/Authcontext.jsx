import { createContext, useEffect, useReducer } from "react";
export const Authcontext = createContext();
export const authreducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return { user: action.payload };
    }

    case "LOGOUT": {
      return { user: null };
    }
    default:
      return state;
  }
};
export const Authcontextprovider = ({ children }) => {
  const [state, dispatch] = useReducer(authreducer, {
    user: null,
  });
  useEffect(() => {
    const check = JSON.parse(localStorage.getItem("user"));
    if (check) {
      dispatch({ type: "LOGIN", payload: check });
    }
  }, []);
  console.log("authcontext state :", state);
  return (
    <Authcontext.Provider value={{ ...state, dispatch }}>
      {children}
    </Authcontext.Provider>
  );
};
