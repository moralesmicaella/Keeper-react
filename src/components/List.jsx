import React from "react";
import Note from "./Note";

function List(props) {
  function handleDelete(id) {
    props.onDelete(id);
  }

  return (
    <div className="list-container">
      {props.notes.map((note, index) => {
        return (
          <Note
            key={index}
            id={index}
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
