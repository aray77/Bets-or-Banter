//Navigation bar
import logo from "../Assets/logo.png";
import "./navBar.css";
import { useNavigate, useLocation } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <div className="NavBar">
      <img id="navLogo" src={logo} alt="Logo" onClick={handleLogoClick} />
      <p style={{ color: "#0c2861", fontSize: "2.5rem" }}>Bet or Banter</p>
    </div>
  );
}

export default NavBar;
