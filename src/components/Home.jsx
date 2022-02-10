import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import List from "./List";

function Home() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  const db = getFirestore();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      getNotes();
    }
  }, [currentUser]);

  onAuthStateChanged(auth, (user) => {
    setCurrentUser(user);
  });

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
