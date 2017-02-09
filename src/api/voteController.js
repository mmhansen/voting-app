const pollModel = require('../models/poll')
const controller = {}

controller.vote = function (req, res, next) {
  pollModel
    .findOneAndUpdate({
      _id: req.params.pollId,
      'options._id': req.params.optionId
    }, {
      $set: {
        'options.$.votes': req.body.value
      }
    }, {
      new: true,
      runValidators: true
    })
  .then(poll => {
    res
      .status(200)
      .json({
        body: 'Vote added.',
        poll: poll
      })
  })
  .catch(next)
}

module.exports = controller
