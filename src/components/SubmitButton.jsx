import React from "react";
import { Link } from "react-router-dom";

function SubmitButton(props) {
  return (
    <Link to={props.path} style={{ textDecoration: "none" }}>
      <div className="submitButton" style={props.style}>
        {props.img !== null && (
          <div className="buttonImg">
            <img src={props.img} alt="icon" />
          </div>
        )}
        <div>{props.title}</div>
      </div>
    </Link>
  );
}

export default SubmitButton;
