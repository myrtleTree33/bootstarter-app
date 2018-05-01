import React, { Component } from "react";
import PropTypes from "prop-types";

import Form from "./Form";
import List from "./List";

class Home extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Form />
        <List />
      </div>
    );
  }
}

export default Home;