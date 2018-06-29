import React, { Component, Fragment } from "react";
import Chirp from "./Chirp";

class Chirpslist extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let data = this.props.data;
    let chirps = [];
    if (data) {
      for (let key in data) {
        if (key !== "nextid") {
          chirps.push(
            <Chirp data={data[key]} key={key} id={key} />
          );
        }
      }
    }

    return (
      <Fragment>
        <h1>Chirps List</h1>
        <div className="row">{chirps}</div>
      </Fragment>
    );
  }
}

export default Chirpslist;
