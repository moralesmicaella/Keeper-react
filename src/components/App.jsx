import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { auth } from "../firebase";
import AuthContext from "./AuthContext";

import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
