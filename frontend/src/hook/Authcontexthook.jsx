import { Authcontext } from "../context/Authcontext";
import { useContext } from "react";
export default function Authcontexthook() {
  const context = useContext(Authcontext);
  if (!context) {
    throw Error("useauthcontext should be inside of the authcontextprovider");
  }
  return context;
}
