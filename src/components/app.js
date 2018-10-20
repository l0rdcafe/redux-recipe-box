// @flow

import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import * as actionCreators from "../actions/actionCreators";
import Main from "./main";

function mapStateToProps(state) {
  return { recipes: [...state.recipes], form: state.form };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const Comp = props => (
  <Router>
    <Switch>
      <Main {...props} />
    </Switch>
  </Router>
);

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Comp);

export default App;
