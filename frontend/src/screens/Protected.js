import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Protected extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <p>this is a protected route</p>
        <p>User details: {localStorage.getItem('user')}</p>
      </div>
    );
  }
}

export default Protected;
