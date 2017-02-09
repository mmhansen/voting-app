const test = require('tape')
const request = require('supertest')
const server = require('../src')

const fixtures = require('./fixtures')
const pollModel = require('../src/models/poll')
const before = require('./utils').before
const after = require('./utils').after
const newPoll = () => {
  const newPoll = new pollModel(fixtures.pollUpdate)
  return newPoll.save()
}
const findPoll = () => {
  return pollModel.findOne({}).exec()
}
test('before', before)

test('PUT /vote/:pollId/:optionId', t => {
  newPoll()
    .then(poll => {
      const vote = {
        value: 1
      }
      t.equal(poll.options[0].votes, 0, 'should have no initial votes')
      request(server)
        .put('/api/vote/' + poll._id + '/' + poll.options[0]._id)
        .send(vote)
        .end((err, res) => {
          if (err) t.fail()
          t.equal(res.body.body, 'Vote added.', 'should increment vote')
          t.equal(res.body.poll.options[0].votes, 1, 'should have one vote')
          t.end()
        })
    })
})

test('PUT /vote/:pollId/:optionId', t => {
  findPoll()
    .then(poll => {
      const vote = {
        value: 0
      }

      t.equal(poll.options[0].votes, 1, 'should have an initial vote')
      request(server)
        .put('/api/vote/' + poll._id + '/' + poll.options[0]._id)
        .send(vote)
        .end((err, res) => {
          if (err) t.fail()
          t.equal(res.body.body, 'Vote added.', 'should decrement vote')
          t.equal(res.body.poll.options[0].votes, 0, 'should be back at 0')
          t.end()
        })
    })
})

test('after', after)
