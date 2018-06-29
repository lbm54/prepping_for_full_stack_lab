import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class ChirpDetails extends Component {
  constructor(props) {
    super(props);
    this.id = props.match.params.id;
    this.state = {
      details: {}
    };
    this.handleDelete = async () => {
      try {
        let response = await fetch(`/api/chirps/${this.id}`, {
          method: "DELETE"
        });
        this.props.history.push('/');
      } catch (e) {
        console.log(e);
      }
    };
  }

  async componentDidMount() {
    let response = await fetch(`/api/chirps/${this.id}`);
    let json = await response.json();
    this.setState({ details: json });
  }

  render() {
    let editLink = `/edit/${this.id}`;
    return (
      <div className="container">
        <h1>Chirps Detail</h1>
        <h3>Name: {this.state.details.name}</h3>
        <h3>Body:</h3>
        <p>{this.state.details.body}</p>
        <button
          className="btn btn-danger m-1"
          onClick={event => this.handleDelete()}
        >
          Delete
        </button>
        <Link to={editLink}>
          <button className="btn btn-warning m-1">Edit</button>
        </Link>
        <Link to="/">
          <button className="btn btn-primary m-1">Go back</button>
        </Link>
      </div>
    );
  }
}

export default ChirpDetails;
