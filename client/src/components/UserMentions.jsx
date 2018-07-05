import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class UserMentions extends Component {
  constructor(props) {
    super(props);
    this.id = props.match.params.userid;
    this.state = {};
  }

  async componentDidMount() {
    try {
      let response = await fetch(`../api/chirps/mentions/${this.id}`);
      let json = await response.json();
      this.setState({ mentions: json });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    let mentions = [];
    for (let key in this.state.mentions) {
      mentions.push(
        <li key={key}>
          Id: {key} Text: {this.state.mentions[key].chirpText}
        </li>
      );
    }
    return (
      <Fragment>
        <h1>User Mentions</h1>
        <ul>{mentions}</ul>
        <Link to="/">
          <button className="btn btn-primary">Go Back</button>
        </Link>
      </Fragment>
    );
  }
}

export default UserMentions;
