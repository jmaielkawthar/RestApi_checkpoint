let mongoose = require('mongoose')
// let validator = require('validator')
let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age:{
    type: Number,
    default: 0,
  },
  favoriteFoods: {
    type: [String],
    default: [],
  }
})
module.exports = mongoose.model('User', userSchema)