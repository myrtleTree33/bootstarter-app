import { createReducer } from "./baseReducer";
import { ARTICLE_ADD } from "../constants/redux/articles";

const initialState = [];

function articleAdd(state, action) {
  return [ ...state, action.payload];
}

export default createReducer(initialState, {
  [ARTICLE_ADD]: articleAdd
});
