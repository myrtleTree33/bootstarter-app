const mongoose = require('mongoose');

import { passwordMatches } from '../util/algo';

let userSchema = new mongoose.Schema({
  dateJoined: {
    type: Date,
    default: Date.now
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    // unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  password: {
    type: String
  },
  googleProvider: {
    type: {
      id: String,
      token: String
    },
    select: false
  },
  facebookProvider: {
    type: {
      id: String,
      token: String
    },
    select: false
  }
});

userSchema.statics.upsertGoogleUser = function(token, tokenSecret, profile) {
  console.log(profile);
  return this.findOneAndUpdate(
    { 'googleProvider.id': profile.id },
    {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value,
      googleProvider: { id: profile.id, token: token, tokenSecret: tokenSecret }
    },
    { upsert: true }
  ).catch(e => console.log(`OOPS ${e}`));
};

userSchema.statics.upsertFacebookUser = function(token, tokenSecret, profile) {
  return this.findOneAndUpdate(
    { 'facebookProvider.id': profile.id },
    {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value,
      facebookProvider: {
        id: profile.id,
        token: token,
        tokenSecret: tokenSecret
      }
    },
    { upsert: true }
  );
};

userSchema.statics.verifyAndFindClassicUser = function({ email, password }) {
  return new Promise((resolve, reject) => {
    (async () => {
      const user = await this.findOne({ email });
      if (!user) {
        reject('Unable to find user');
      }
      const result = await passwordMatches(password, user.password);
      console.log(result);
      if (!result) {
        reject('Invalid password');
      }
      resolve(user);
    })();
  });
};

export default mongoose.model('User', userSchema);
