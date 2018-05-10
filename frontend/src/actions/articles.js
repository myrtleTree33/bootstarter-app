import { ARTICLE_ADD } from "../constants/articles";

export function articleAdd(article) {
  return { type: ARTICLE_ADD, payload: article };
}
