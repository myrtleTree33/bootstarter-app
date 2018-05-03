import { ARTICLE_ADD } from "../constants";

export const articleAdd = (article) => ({type: ARTICLE_ADD, payload: article});

// export function articleAdd() {
//     return async dispatch => {
//         return new Promise()
//     }
// }