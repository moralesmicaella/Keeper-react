import React from "react";
import { Link } from "react-router-dom";

function Button(props) {
  const style = { textDecoration: "none" };
  return (
    <Link to={props.path} style={style}>
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

export default Button;

// https://freesvg.org/img/1534129544.png
