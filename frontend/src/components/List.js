import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const List = ({ articles }) => (
  <ul>{articles.map(el => <li key={el.id}>{el.title}</li>)}</ul>
);

function mapState(state) {
  return { articles: state.articles };
}

export default connect(mapState, null)(List);
