import React from "react";

function SubmitButton(props) {
  return (
    <button className="submit" style={props.style} onClick={props.onClick}>
      <div>{props.title}</div>
    </button>
  );
}

export default SubmitButton;
