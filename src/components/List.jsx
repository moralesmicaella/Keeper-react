import React from "react";
import Note from "./Note";

function List(props) {
  function handleDelete(id) {
    props.onDelete(id);
  }

  return (
    <div className="list-container">
      {props.notes.map((note) => {
        return (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            onDelete={handleDelete}
          />
        );
      })}
    </div>
  );
}

export default List;
