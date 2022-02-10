import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import List from "./List";

function Home() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  });

  onAuthStateChanged(auth, (user) => {
    setCurrentUser(user);
  });

  function addNote(note) {
    setNotes([...notes, note]);
  }

  function deleteNote(id) {
    setNotes(() => {
      return notes.filter((_, index) => {
        return id !== index;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      <List notes={notes} onDelete={deleteNote} />
      <Footer />
    </div>
  );
}

export default Home;
