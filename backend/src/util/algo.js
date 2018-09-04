/**
 * Contains utilities for encrypting and checking password
 */

import config from '../../config';

var bcrypt = require('bcrypt');
const saltRounds = config.security.bcrypt.saltRounds;

export function hashPassword(plainPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(plainPassword, saltRounds, function(err, hash) {
      if (err) {
        reject(err);
      }
      resolve(hash);
    });
  });
}

export function passwordMatches(plainPassword, hashedPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainPassword, hashedPassword, function(err, result) {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}

// (async () => {
//   console.log(await hashPassword('abc'));
// })();
