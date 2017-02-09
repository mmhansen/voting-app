const controller = {}
const pollModel = require('../models/poll')

controller.get = function (req, res, next) {
  pollModel
    .find({})
    .exec()
    .then(function (polls) {
      res
        .status(200)
        .json({
          polls: polls
        })
    })
    .catch(next)
}

controller.create = function (req, res, next) {
  const newPoll = new pollModel(req.body)
  newPoll
    .save()
    .then(poll => {
      res
        .status(200)
        .json({
          body: 'Poll created.',
          poll: poll
        })
    })
    .catch(next)
}

controller.update = function (req, res, next) {
  pollModel
    .findByIdAndUpdate(
      req.params.pollId,
      req.body,
      { new: true }
    )
    .then(poll => {
      res
        .status(200)
        .json({
          body: 'Poll updated.',
          poll: poll
        })
    })
    .catch(next)
}

controller.remove = function (req, res, next) {
  pollModel
    .findById(req.params.pollId)
    .remove({})
    .exec()
    .then(poll => {
      res
        .status(200)
        .json({
          body: 'Poll deleted.'
        })
    })
    .catch(next)
}

module.exports = controller
