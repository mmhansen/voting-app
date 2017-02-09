const mongoose = require('mongoose')

const poll = new mongoose.Schema({
  options: [
    {
      type: String,
      unique: true,
      votes: Number
    }
  ]
})

const pollSchema = mongoose.model('poll', poll)
module.exports = pollSchema
