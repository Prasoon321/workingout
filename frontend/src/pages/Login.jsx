import { useState } from "react";
import { Uselogin } from "../hook/Uselogin";

function Login() {
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const { login, isloading, error } = Uselogin();

  const handlesubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    Setemail("");
    Setpassword("");
  };
  return (
    <div>
      <form onSubmit={handlesubmit}>
        <h3>Login In </h3>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          onChange={(e) => Setemail(e.target.value)}
          value={email}
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          onChange={(e) => Setpassword(e.target.value)}
          value={password}
        />
        <button disabled={isloading}>Log In</button>
      </form>
      {error && <div style={{ color: "red", marginTop: "20px" }}>{error}</div>}
    </div>
  );
}

export default Login;
