import { Workoutcontext } from "../context/Workoutcontext";
import { useContext } from "react";
export default function Workoutcontexthook() {
  const context = useContext(Workoutcontext);
  if (!context) {
    throw Error(
      "useworkoutcontext should be inside of the workoutcontextprovider"
    );
  }
  return context;
}
