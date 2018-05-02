import { createReducer } from "./baseReducer";
import { ARTICLE_ADD } from "../constants";

const initialState = {
  articles: []
};

function articleAdd(state, action) {
  return { ...state, articles: [...state.articles, action.payload] };
}

const articleReducer = createReducer(initialState, {
  [ARTICLE_ADD]: articleAdd
});

export default articleReducer;
