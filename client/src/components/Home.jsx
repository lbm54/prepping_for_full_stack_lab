import React, { Fragment, Component } from "react";
import ChirpList from "./ChirpList";
import ChirpSubmit from "./ChirpSubmit";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chirps: []
    };

    this.refresh = async () => {
        try {
            let response = await fetch("./api/chirps");
            let json = await response.json();
            this.setState({ chirps: json });
          } catch (e) {
            console.log(e);
          }
      }
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col col-xs-8">
            <ChirpList data={this.state.chirps} />
          </div>
          <div className="col col-xs-4">
            <ChirpSubmit refresh={this.refresh} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
