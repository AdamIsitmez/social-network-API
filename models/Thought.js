const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: Types.ObjectId,
    },
    reactionBody: {
      type: String,
      required: true,
      minlength: [1, 'Field must be at least 1 character long'],
      maxlength: [280, 'Field cannot exceed 280 characters']
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  }
)

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: [1, 'Field must be at least 1 character long'],
      maxlength: [280, 'Field cannot exceed 280 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.path('createdAt').get(function (value) {
  return value.toLocaleString();
});

reactionSchema.path('createdAt').get(function (value) {
  return value.toLocaleString();
});

thoughtSchema.virtual('reactionCount', function () {
  return this.reactions.length();
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
