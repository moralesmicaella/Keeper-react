import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import List from "./List";

function Home() {
  const [notes, setNotes] = useState([]);

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
