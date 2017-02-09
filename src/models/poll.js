const mongoose = require('mongoose')

const option = {
  name: {
    type: String,
    required: true
  },
  votes: {
    type: Number,
    default: 0
  }
}

const poll = new mongoose.Schema({
  options: {
    type: [option],
    required: true
  }
})

let pollSchema
try {
  pollSchema = mongoose.model('poll')
} catch (e) {
  pollSchema = mongoose.model('poll', poll)
}
module.exports = pollSchema
