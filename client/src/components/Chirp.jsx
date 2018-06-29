import React, { Component } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";

const Chirp = (props) => {

  let link = `/${props.id}`;
    return (
      <div className="card m-2">
        <div className="card-header">
          <div className="card-title">{props.data.name}</div>
        </div>
        <div className="card-body">
          <div className="card-text">{props.data.body}</div>
        </div>
        <div className="card-footer">
          <Link to={link}>
            <button className="btn btn-primary">See Details</button>
          </Link>
        </div>
      </div>
    );
}

export default Chirp;
