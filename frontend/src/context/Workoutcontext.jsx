import { createContext, useReducer } from "react";

export const Workoutcontext = createContext();
export const Workoutcontextprovider = ({ children }) => {
  const workoutreducer = (state, action) => {
    switch (action.type) {
      case "SET_WORKOUT":
        return {
          workouts: action.payload,
        };
      case "CREATE_WORKOUT":
        return {
          workouts: [action.payload, ...state.workouts],
        };
      case "4e":
        return {
          workouts: state.workouts.filter((w) => w._id !== action.payload._id),
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(workoutreducer, {
    workouts: null,
  });
  return (
    <Workoutcontext.Provider value={{ ...state, dispatch }}>
      {children}
    </Workoutcontext.Provider>
  );
};
