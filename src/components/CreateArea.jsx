import React, { useRef, useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import Zoom from "@mui/material/Zoom";
import AddIcon from "@mui/icons-material/Add";

function CreateArea(props) {
  const auth = getAuth();
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const [isExpanded, setExpanded] = useState(false);
  const ref = useRef(null);

  const db = getFirestore();

  function handleChange(event) {
    const { name, value } = event.target;
    const newNote = {
      ...note,
      [name]: value,
      uid: auth.currentUser.uid,
    };
    setNote(newNote);
  }

  function submitNote(event) {
    event.preventDefault();

    props.onAdd(note);

    addDoc(collection(db, "notes"), note)
      .then((_) => {
        setNote({
          title: "",
          content: "",
        });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  function expand() {
    setExpanded(true);
  }

  function handleMouseDown(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      setExpanded(false);
    }
  }

  return (
    <div onMouseDown={handleMouseDown}>
      <form ref={ref} className="create-note">
        {isExpanded && (
          <input
            onChange={handleChange}
            value={note.title}
            name="title"
            placeholder="Title"
          />
        )}

        <textarea
          onChange={handleChange}
          value={note.content}
          onClick={expand}
          name="content"
          placeholder="Take a note..."
          rows={isExpanded ? 4 : 1}
        />
        <Zoom in={isExpanded}>
          <button onClick={submitNote}>
            <AddIcon />
          </button>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
