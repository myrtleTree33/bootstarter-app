import React, { Component } from "react";
import PropTypes from "prop-types";

import Todo from '../components/Todo/Todo';

class Home extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Todo/>
      </div>
    );
  }
}

export default Home;