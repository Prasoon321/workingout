import { Link } from "react-router-dom";
import Uselogout from "../hook/Uselogout";
import Authcontexthook from "../hook/Authcontexthook";
function Navbar() {
  const { user } = Authcontexthook();
  const { logout } = Uselogout();
  const handlesubmit = () => {
    console.log("Log Out button clicked");
    logout();
  };
  return (
    <>
      <header className="navbar">
        <div className="navbar__title navbar__item">Workout Buddy</div>
        <div className="navbar__item">
          <Link to="/" style={{ color: "white" }}>
            Workout buddy
          </Link>
        </div>
        {user && (
          <div>
            <button onClick={handlesubmit}>Log Out</button>
            <span>{user.email}</span>
          </div>
        )}
        <nav>
          {!user && (
            <>
              <Link to="/login" style={{ color: "white", marginRight: "10px" }}>
                Login
              </Link>
              <Link to="/signup" style={{ color: "white" }}>
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
}

export default Navbar;
