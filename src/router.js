const router = require('express').Router()
const pollController = require('./api/pollController')

router.get('/poll', pollController.get)
router.post('/poll', pollController.create)
router.put('/poll/:pollId', pollController.update)
router.delete('/poll/:pollId', pollController.remove)

module.exports = router
