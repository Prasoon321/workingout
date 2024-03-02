import { useState, useEffect } from "react";
import { Usesignup } from "../hook/Usesignup";
function Signup() {
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const { signup, isloading, error } = Usesignup();
  const handlesubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
    Setemail("");
    Setpassword("");
  };
  useEffect(() => {
    // This code runs on component mount (initial render)
    Setemail("");
    Setpassword("");
  }, []);
  return (
    <div>
      <form onSubmit={handlesubmit}>
        <h3>Sign Up</h3>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          autoComplete="off"
          onChange={(e) => Setemail(e.target.value)}
          value={email}
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          autoComplete="off"
          onChange={(e) => Setpassword(e.target.value)}
          value={password}
        />
        <button disabled={isloading}>Sign In</button>
        {error && (
          <div style={{ color: "red", marginTop: "20px" }}>{error}</div>
        )}
      </form>
    </div>
  );
}

export default Signup;
