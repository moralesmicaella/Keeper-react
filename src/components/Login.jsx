import React, { useState } from "react";
import { Link } from "react-router-dom";
import HighlightIcon from "@mui/icons-material/Highlight";
import SubmitButton from "./SubmitButton";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="card">
      <h1>
        <HighlightIcon />
        Welcome Back!
      </h1>
      <form>
        <div className="input-group">
          <label>Email</label>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="Enter Email"
          />
          <label>Password</label>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Enter Password"
          />
        </div>
        <SubmitButton title="Sign in" />
        <p className="signup-txt">
          Not a member? <Link to="/signup">Sign up now</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
