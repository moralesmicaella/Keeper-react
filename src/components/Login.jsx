import React from "react";
import { Link } from "react-router-dom";
import HighlightIcon from "@mui/icons-material/Highlight";
import Button from "./Button";

function Login() {
  return (
    <div className="login-container">
      <h1>
        <HighlightIcon />
        Welcome Back!
      </h1>
      <form>
        <label>Email</label>
        <input type="email" placeholder="Enter Email" />
        <label>Password</label>
        <input type="password" placeholder="Enter Password" />
        <Button path="/" title="Sign in" img={null} />
        <p>
          <span>or</span>
        </p>
        <Button
          path="/"
          title="Continue with Google"
          img="https://freesvg.org/img/1534129544.png"
          style={{ backgroundColor: "white", color: "black" }}
        />
      </form>
    </div>
  );
}

export default Login;
