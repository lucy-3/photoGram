const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  location: {
    type: String
  },
  bio: {
    type: String
  },

  stats: {
    posts: {
      type: Number
    },
    followers: {
      type: Number
    },
    following: {
      type: Number
    }
  },

  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    }
  }
});

const Profile = mongoose.model('profile', ProfileSchema);
module.exports = Profile;