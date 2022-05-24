const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    writtenBy: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
      type: String,
      required: true,
      ref: 'User'
  },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    }
  }
);
  
ThoughtSchema.virtual('replyCount').get(function() {
  return this.replies.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;