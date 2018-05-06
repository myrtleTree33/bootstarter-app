import React, { Component } from "react";
import PropTypes from "prop-types";

class Protected extends Component {
  constructor() {
    super();
  }

  render() {
    return <div>this is a protected route</div>;
  }
}

export default Protected;
