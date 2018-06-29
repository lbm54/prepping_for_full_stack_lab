import React, { Component, Fragment } from "react";

class ChirpSubmit extends Component {
  constructor(props) {
    super(props);

    this.state = {
        name: "",
        body: ""
    };

    this.handleNameChange = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    this.handleClick = () => {
        let chirp = {
            name: this.state.name,
            body: this.state.body
        }
        fetch('/api/chirps/', {
            method: 'POST',
            body: JSON.stringify(chirp),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            props.refresh();
        })
    }
  }

  render() {
    return (
      <Fragment>
        <h1>Chirp Submit</h1>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            id="chirpNameInput"
            placeholder="name"
            onChange={(event) => this.handleNameChange("name", event.target.value)}
          />
          <input
            className="form-control"
            type="text"
            id="chirpBodyInput"
            placeholder="body"
            onChange={(event) => this.handleNameChange("body", event.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={event => this.handleClick(event)}
          >
            Submit
          </button>
        </div>
      </Fragment>
    );
  }
}

export default ChirpSubmit;
