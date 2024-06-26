const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
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
  },
  {
    _id: false,
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
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.path('createdAt').get(function (value) {
  return new Date(value).toLocaleString();
});

reactionSchema.path('createdAt').get(function (value) {
  return new Date(value).toLocaleString();
});

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
