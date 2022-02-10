import React from "react";
import { Link } from "react-router-dom";
import HighlightIcon from "@mui/icons-material/Highlight";
import LogoutIcon from "@mui/icons-material/Logout";

function Header() {
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
          <Link to="/login" style={{ textDecoration: "none" }}>
            <h1>
              <LogoutIcon />
            </h1>
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
