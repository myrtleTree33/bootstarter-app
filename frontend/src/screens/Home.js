import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'bloomer';

import Todo from '../components/Todo/Todo';

class Home extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Todo />
      </div>
    );
  }
}

export default Home;
