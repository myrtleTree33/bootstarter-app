import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const List = ({ articles }) => (
  <ul>{articles.map(el => <li key={el.id}>{el.title}</li>)}</ul>
);

export default List;
