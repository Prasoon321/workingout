import "../src/App";
import "./App.css";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Authcontexthook from "./hook/Authcontexthook";
import Dashboard from "./components/Dashboard";
function App() {
  const { user } = Authcontexthook();
  return (
    <>
      <BrowserRouter>
        <div className="pages">
          <Navbar />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
