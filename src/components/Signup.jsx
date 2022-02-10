import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SubmitButton from "./SubmitButton";

function Signup() {
  const auth = getAuth();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
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

  const signup = (event) => {
    event.preventDefault();

    if (password !== passwordConf) {
      setErrorMessage(
        "The passwords you entered don't match. Please try again."
      );
    } else {
      setPersistence(auth, browserLocalPersistence).then(() => {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            navigate("/");
          })
          .catch((error) => {
            switch (error.code) {
              case "auth/invalid-email":
                setErrorMessage("Invalid email. Please try again.");
                break;
              case "auth/email-already-in-use":
                setErrorMessage("Email already in use. Please log in.");
                break;
              case "auth/weak-password":
                setErrorMessage(
                  "Weak Password. Please use at least 6 characters."
                );
                break;
              default:
                setErrorMessage(error.code);
            }
          });
      });
    }
  };

  return (
    <div className="card">
      <h1>Create an account</h1>
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
          <label>Confirm Password</label>
          <input
            value={passwordConf}
            onChange={(event) => setPasswordConf(event.target.value)}
            type="password"
            placeholder="Re-enter Password"
          />
          {errorMessage !== "" && (
            <label className="error-msg">
              <ErrorOutlineIcon style={{ marginRight: "10px" }} />{" "}
              {errorMessage}
            </label>
          )}
        </div>
        <SubmitButton title="Register" onClick={signup} />
      </form>
    </div>
  );
}

export default Signup;
