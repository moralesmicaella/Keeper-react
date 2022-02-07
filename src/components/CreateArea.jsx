import React, { useRef, useState } from "react";
import Zoom from "@mui/material/Zoom";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const [isExpanded, setExpanded] = useState(false);
  const ref = useRef(null);

  function handleChange(event) {
    const { name, value } = event.target;
    const newNote = {
      ...note,
      [name]: value,
    };
    setNote(newNote);
  }

  function submitNote(event) {
    props.onAdd(note);

    setNote({
      title: "",
      content: "",
    });

    event.preventDefault();
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
          <IconButton onClick={submitNote}>
            <AddIcon />
          </IconButton>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
