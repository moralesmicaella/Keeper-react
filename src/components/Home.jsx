import React, { useEffect, useState, useContext } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import AuthContext from "./AuthContext";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import List from "./List";
import { Navigate } from "react-router-dom";

function Home() {
  const currentUser = useContext(AuthContext);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  function addNote(note) {
    getNotes();
  }

  function deleteNote(id) {
    deleteDoc(doc(db, "notes", id)).then(() => getNotes());
  }

  function getNotes() {
    const notesRef = collection(db, "notes");
    getDocs(notesRef).then((notesSnap) => {
      const foundNotes = [];
      notesSnap.forEach((noteDoc) => {
        const note = noteDoc.data();
        if (currentUser.uid === note.uid) {
          note["id"] = noteDoc.id;
          foundNotes.push(note);
        }
      });
      setNotes(foundNotes);
    });
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
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
