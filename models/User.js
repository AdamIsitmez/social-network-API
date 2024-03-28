const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');
const isEmail = require('../utils/lib')

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: isEmail(email),
        message: props => `${props.value} is not a valid email address!`
      }
    },
    thoughts: [thoughtSchema],
    friends: [userSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

userSchema.virtual('friendCount', () => {
  return this.friends.length();
})

const User = model('user', userSchema);

module.exports = User;
