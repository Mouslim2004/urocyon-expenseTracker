const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const session = require('express-session')
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

app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: true
}))

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
      //res.redirect('/expense')
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


app.post('/tracker/:name',async (req,res) => {
   
  try {
    //const {description, amount} = req.body
    let data = {
      description: req.body.description,
      amount: req.body.amount
    }

    if(!data.description || !data.amount){
     return res.json({ error: 'Description and amount are required.' });
    } else {
     // const checkName = await User.find({name: req.params.name})
      //console.log(checkName.name)
      //checkName.expenses.push({description, amount})
      //await checkName.save()
      
      return res.json({ message: "Expense saved successfully!", data: data });
      
    }
  } catch(error){
    return res.json({error: 'Error adding expense'})
  }
  
})

app.get('/expense',(req,res) => { // ${req.params.name}
  res.render('expense')
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})