
import { ARTICLE_ADD } from "../constants";

const initialState = {
  articles: []
};

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ARTICLE_ADD:
      return { ...state, articles: [...state.articles, action.payload] };
    default:
      return state;
  }
};

export default articleReducer;