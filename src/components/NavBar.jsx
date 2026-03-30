import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./css/NavBar.css";
import logo from "../assets/logo.png";
import stumps from "../assets/stumps.png"


function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation()

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav>
      <div className="left">
        <img className="stumps" src={stumps} alt="" />
        <div className="logo">
          <img className="lo" src={logo} alt="logo" />
        </div>
      </div>

      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✖" : "☰"}
      </div>

      <div className={`pages ${menuOpen ? "show" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/teams">Teams</Link>
        <Link to="/matches">Matches</Link>
        <Link to="/stats">Stats</Link>


        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/leaderboard">Leaderboard</Link>
            <Link to="/my-predictions">My Predictions</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;