import { ARTICLE_ADD } from "../constants/redux/articles.js";

export function articleAdd(article) {
  return { type: ARTICLE_ADD, payload: article };
}
