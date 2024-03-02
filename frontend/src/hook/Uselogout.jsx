import Authcontexthook from "./Authcontexthook";
function Uselogout() {
  const { dispatch } = Authcontexthook();
  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");
    // dispatch logout action
    dispatch({ type: "LOGOUT" });
  };
  return { logout };
}

export default Uselogout;
