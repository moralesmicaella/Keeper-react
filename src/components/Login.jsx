import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import HighlightIcon from "@mui/icons-material/Highlight";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SubmitButton from "./SubmitButton";
import AuthContext from "./AuthContext";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const currentUser = useContext(AuthContext);

  function login(event) {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        navigate("/");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            setErrorMessage("Invalid email. Please try again.");
            break;
          case "auth/user-not-found":
            setErrorMessage("User not found. Please sign up.");
            break;
          case "auth/wrong-password":
            setErrorMessage("Wrong Password. Please try again.");
            break;
          default:
            setErrorMessage(error.code);
        }
      });
  }

  if (currentUser) {
    return <Navigate to="/" />;
  }

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
          {errorMessage !== "" && (
            <label className="error-msg">
              <ErrorOutlineIcon style={{ marginRight: "10px" }} />{" "}
              {errorMessage}
            </label>
          )}
        </div>
        <SubmitButton title="Sign in" onClick={login} />
        <p className="signup-txt">
          Not a member? <Link to="/signup">Sign up now</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
