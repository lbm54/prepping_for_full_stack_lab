import React, { Component, Fragment } from "react";

class EditChirp extends Component {
  constructor(props) {
    super(props);
    this.id = props.match.params.id;

    this.state = {
      name: "",
      body: ""
    };

    this.handleInputChange = (what, value) => {
      this.setState({
        [what]: value
      });
    };

    this.editChirp = async () => {
      let chirp = {
        name: this.state.name,
        body: this.state.body
      };
      try {
        let response = await fetch(`/api/chirps/${this.id}`, {
          method: "PUT",
          body: JSON.stringify(chirp),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
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
    this.setState({ name: json.name, body: json.body});
  }

  render() {
    return (
      <div className="container">
        <h1>Edit Chirp</h1>
        <div className="form-group">
        <input
          type="text"
          name="name"
          className="form-input m-1"
          onChange={event => this.handleInputChange("name", event.target.value)}
          value={this.state.name}
        />
        <input
          type="text"
          name="body"
          className="form-input m-1"
          onChange={event => this.handleInputChange("body", event.target.value)}
          value={this.state.body}
        />
        </div>
        <button className="btn btn-primary" onClick={this.editChirp}>
          Edit Chirp
        </button>
      </div>
    );
  }
}

export default EditChirp;
