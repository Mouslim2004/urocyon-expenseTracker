const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()

mongoose.connect('mongodb://localhost:27017/expense_db')

const db = mongoose.connection
db.on('error', () => {
  console.log('Connection to database failed!')
})
db.once('open', () => {
  console.log('Database connected successfully!')
})

const User = require('./model/User')

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/',(req,res) => {
  res.render('onboard')
})

app.get('/login',(req,res) => {
  res.render('login')
})


app.post('/login', async (req,res) => {
  try{
    const check = await User.findOne({email: req.body.email})
    if(check.password === req.body.password){
      res.render('addExpense', {check: check})
    } else {
      return res.redirect('/login')
    }
  } catch {
    return res.redirect('/login')
  }
})

app.post('/signup',async (req,res) => {
  let data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }
  if(data.name == "" || data.email == "" || data.password == ""){
      //req.flash('msg','Please fill the form')
      res.redirect('/signup')
  } else {
     await User.insertMany([data])
     res.render('login')
  }
})

app.get('/signup',(req,res) => {
  res.render('signup')
})

app.get('/add-expense',(req,res) => {
  res.render('addExpense')
})

// app.post('/add-expense/:name',async (req,res) => {
  
//   try{
//     const nameExpense = await User.findOne({name: req.params.name})
//     let dataCheck = {
//       description: req.body.description,
//       amount: req.body.amount
//     }
//     if(dataCheck.description == "" || dataCheck.amount == ""){
//       res.redirect('/add-expense')
//     } else {
//       if(nameExpense){

//       }
//     }
//   } catch {

//   }
// })

app.get('/homepage',(req,res) => {
  res.render('homepage')
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})