const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const http = require('debug')('http')
const db = require('debug')('db')
const config = require('./config')
const port = config.port
/**
 * Create server instance
 */
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res, next) {
  res
    .status(200)
    .json({
      body: 'hello world!'
    })
})

app.get('/*', function (req, res, next) {
  res
    .status(404)
    .json({
      body: 'Not found.'
    })
})

app.use(function (err, req, res, next) {
  res
    .status(400)
    .json({
      body: err.message
    })
})

const dbConnection = mongoose.connection
mongoose.connect(config.database)
dbConnection.on('connected', function () {
  db('Db connected on ' + config.database)
})

app.listen(port, function () {
  http('server running on port ' + port)
})

module.exports = app
