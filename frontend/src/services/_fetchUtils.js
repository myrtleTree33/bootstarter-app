// contains and wraps utils for fetching json files

/* global fetch */

const _fetchJson = (url, opts = {}) =>
  fetch(url, {
    ...opts,
    headers: {
      ...opts.headers,
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });

export const fetchJson = (url, opts = {}) =>
  _fetchJson(url, opts).then(res => res.json());

export const fetchJsonAuth = (url, opts = {}) => {
  return _fetchJson(url, {
    ...opts,
    headers: {
      ...opts.headers,
      Authorization: `jwt ${localStorage.getItem("token")}`
    }
  })
    .then(res => {
      if (res.status === 401) {
        // unauthorized; cause user to logout and set token to null
        localStorage.removeItem("token", null);
      }
      return res;
    })
    .then(res => res.json());
};
