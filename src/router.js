const router = require('express').Router()
const pollController = require('./api/pollController')
const voteController = require('./api/voteController')

router.get('/poll', pollController.get)
router.post('/poll', pollController.create)
router.put('/poll/:pollId', pollController.update)
router.delete('/poll/:pollId', pollController.remove)
router.put('/vote/:pollId/:optionId', voteController.vote)

module.exports = router
