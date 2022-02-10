import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  browserLocalPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import HighlightIcon from "@mui/icons-material/Highlight";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SubmitButton from "./SubmitButton";

function Login() {
  const auth = getAuth();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  onAuthStateChanged(auth, (user) => {
    setCurrentUser(user);
  });

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  });

  function login(event) {
    event.preventDefault();

    setPersistence(auth, browserLocalPersistence).then(() => {
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          setCurrentUser(user);
          navigate("/");
        })
        .catch((error) => {
          setErrorMessage("Incorrect username or password. Please try again.");
        });
    });
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
