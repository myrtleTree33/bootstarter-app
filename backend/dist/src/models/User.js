'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  dateJoined: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  googleProvider: {
    type: {
      id: String,
      token: String
    },
    select: false
  }
});

userSchema.statics.upsertGoogleUser = function (token, tokenSecret, profile) {
  return this.findOneAndUpdate({ 'googleProvider.id': profile.id }, {
    email: profile.emails[0].value,
    googleProvider: { id: profile.id, token: token, tokenSecret: tokenSecret }
  }, { upsert: true });
};

exports.default = mongoose.model('User', userSchema);