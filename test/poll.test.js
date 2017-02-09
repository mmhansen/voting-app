const test = require('tape')
const request = require('supertest')
const server = require('../src')

const fixtures = require('./fixtures')
const pollModel = require('../src/models/poll')
const before = require('./utils').before
const after = require('./utils').after

const setup = function () {
  return pollModel
    .findOne({})
    .exec()
}

test('before', before)

test('GET /poll', t => {
  request(server)
    .get('/api/poll')
    .end(function (err, res) {
      if (err) t.fail()
      t.equals(res.status, 200)
      t.equals(res.body.polls.length, 0, 'res.body should be an empty array')
      t.end()
    })
})

test('POST /poll', t => {
  request(server)
    .post('/api/poll')
    .send(fixtures.firstPoll)
    .end((err, res) => {
      if (err) t.fail()
      t.equals(res.status, 200)
      t.equals(res.body.body, 'Poll created.', 'should respond with Poll Created.')
      t.end()
    })
})

test('GET /poll', t => {
  request(server)
    .get('/api/poll')
    .end((err, res) => {
      if (err) t.fail()
      t.equals(res.status, 200)
      t.equals(res.body.polls.length, 1, 'should return a poll')
      t.equals(res.body.polls[0].options[0].name, fixtures.firstPoll.options[0].name, 'options should be equal')
      t.end()
    })
})

test('PUT /poll/:pollId', t => {
  setup()
    .then(poll => {
      request(server)
        .put('/api/poll/' + poll._id)
        .send(fixtures.pollUpdate)
        .end((err, res) => {
          if (err) t.fail()
          t.equals(res.status, 200)
          t.equals(res.body.poll.options[0].name, 'Right', 'should update')
          t.equals(res.body.body, 'Poll updated.', 'should send response')
          t.end()
        })
    })
})

test('DELETE /poll/:pollId', t => {
  setup()
    .then(poll => {
      request(server)
        .delete('/api/poll/' + poll._id)
        .end((err, res) => {
          if (err) t.fail()
          t.equals(res.status, 200)
          t.equals(res.body.body, 'Poll deleted.', 'should send response')
          t.end()
        })
    })
})

test('after', after)
