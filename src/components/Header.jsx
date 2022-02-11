import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import HighlightIcon from "@mui/icons-material/Highlight";
import LogoutIcon from "@mui/icons-material/Logout";

function Header() {
  const navigate = useNavigate();

  function logout() {
    signOut(auth).then(() => {
      navigate("/login");
    });
  }

  return (
    <header>
      <ul>
        <li className="header-title">
          <h1>
            <HighlightIcon />
            Keeper
          </h1>
        </li>
        <li className="logout-btn">
          <h1 onClick={logout}>
            <LogoutIcon />
          </h1>
        </li>
      </ul>
    </header>
  );
}

export default Header;
