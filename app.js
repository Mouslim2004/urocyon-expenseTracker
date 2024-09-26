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
      res.render('expense', {check: check})
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

// app.get('/add-expense/:name',async (req,res) => {
//   try {
//     const user = await User.findOne({ name: req.params.name });
//     if (!user) {
//       return res.redirect('/some-error-page'); // Handle user not found
//     }
//     res.render('addExpense', { check: user });
//   } catch (error) {
//     console.error(error);
//     res.redirect('/some-error-page'); // Handle error
//   }
// })

// app.post('/add-expense/:name',async (req,res) => {
  
//   try{
   
//     const {description, amount} = req.body

//     if(!description || !amount){
//      //return res.redirect(`/add-expense/${req.params.name}`)
//      return res.status(400).json({ message: 'Description and amount are required.' });
//     } else {
//       const newUpdate = await User.updateOne(
//         {name: req.params.name},
//         {$push: {expenses : {description, amount}}},
//         {new : true}
//       )
//       if (!newUpdate) {
//         return res.status(404).json({ message: 'User not found.' });
//       }
//       res.status(200).json(newUpdate);
  
//       const updatedUser = await User.findOne({ name: req.params.name }); // Fetch updated user
//       res.render('homepage', { user: updatedUser });
//     }
//   } catch(error) {
//     console.error(error)
//     //return res.redirect(`/add-expense/${req.params.name}`)
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// })

app.get('/expense',(req,res) => { // ${req.params.name}
  res.render('expense')
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})