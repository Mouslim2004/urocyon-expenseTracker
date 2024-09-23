const mongoose = require('mongoose')
const schema = mongoose.Schema

const UserSchema = new schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  expenses: [
    {
      description: {type: String},
      amount: {type: Number}
    }
  ]
}, {timestamps: true})

const User = mongoose.model('User', UserSchema)
module.exports = User