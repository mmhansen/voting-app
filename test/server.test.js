const test = require('tape')
const request = require('supertest')
const app = require('../src')

test('It should have a home route', function (t) {
  request(app)
    .get('/')
    .end(function (err, res) {
      if (err) t.fail()
      t.assert(res.status, 200, 'responds with 200')
      t.end()
    })
})

test('It should handle 404 requests', function (t) {
  request(app)
    .get('/elbow')
    .end(function (err, res) {
      if (err) t.fail()
      t.assert(res.status, 404, 'responds with 404')
      t.assert(res.body.body, 'Not found.', 'body is Not found.')
      t.end()
    })
})
