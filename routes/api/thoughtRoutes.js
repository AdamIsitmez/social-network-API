const router = require('express').Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  addReaction,
  deleteReaction,
  updateThought,
} = require('../../controllers/thoughtController');

// /api/students
router.route('/')
  .get(getThoughts)
  .post(createThought);

// /api/students/:studentId
router.route('/:thoughtId')
  .get(getSingleThought)
  .delete(deleteThought)
  .put(updateThought);

// /api/students/:studentId/assignments
router.route('/:thoughtId/reactions').post(addReaction);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
