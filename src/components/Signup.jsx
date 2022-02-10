import React, { useState } from "react";
import SubmitButton from "./SubmitButton";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

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
        </div>
        <SubmitButton title="Register" />
      </form>
    </div>
  );
}

export default Signup;
