import { useState } from "react";
import Authcontexthook from "./Authcontexthook";
export const Uselogin = () => {
  const { dispatch } = Authcontexthook();
  const [error, Seterror] = useState(null);
  const [isloading, Setisloading] = useState(null);

  const login = async (email, password) => {
    Setisloading(true);
    Seterror(null);
    const response = await fetch("http://localhost:4000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      Setisloading(false);
      Seterror(json.error);
    }
    if (response.ok) {
      // save the user to the local storage
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      Setisloading(false);
    }
  };
  return { login, isloading, error };
};
