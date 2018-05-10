import { createReducer } from "./baseReducer";
import { ARTICLE_ADD } from "../constants";

const initialState = [];

function articleAdd(state, action) {
  return [ ...state, action.payload];
}

const articles = createReducer(initialState, {
  [ARTICLE_ADD]: articleAdd
});

export default articles;
