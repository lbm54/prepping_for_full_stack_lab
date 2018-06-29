import React, { Component, Fragment } from "react";
import ChirpDetails from "./ChirpDetails";
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Home from './Home';
import EditChirp from './EditChirp';

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/:id" component={ChirpDetails} />
            <Route exact path="/edit/:id" component={EditChirp} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;
