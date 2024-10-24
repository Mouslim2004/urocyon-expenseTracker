const mongoose = require('mongoose')
const schema = mongoose.Schema

const ExpenseSchema = new schema({
  description: {
    type: String
  },
  amount: {
    type: Number
  }
}, {timestamps: true})

const Expense = mongoose.model('User', ExpenseSchema)
module.exports = Expense