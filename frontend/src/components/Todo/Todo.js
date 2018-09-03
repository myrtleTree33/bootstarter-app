import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Form from './Form.js';
import List from './List.js';

import * as articlesActions from '../../actions/articles';

class Todo extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Form articleAdd={this.props.articleAdd} />
        <List articles={this.props.articles} />
      </div>
    );
  }
}

function mapState(state) {
  return { articles: state.articles };
}

function mapDispatch(dispatch) {
  return bindActionCreators(articlesActions, dispatch);
}

export default connect(
  mapState,
  mapDispatch
)(Todo);
