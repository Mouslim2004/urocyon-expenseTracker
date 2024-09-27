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
    const user = await User.findOne({email: req.body.email})
    if(user.password === req.body.password){
      res.render('expense', {user: user})
      //res.redirect('/expense')
      //req.session.userId = user._id; 
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
    let data = {
      description: req.body.description,
      amount: Number(req.body.amount)
    }

    if(data.description == "" || isNaN(data.amount) || data.amount <= 0){
     return res.json({ error: 'Description and amount are required.' });
    } else {
      const userFind = await User.findOne(
        {name: req.params.name}
        //{$push: {expenses: {$each: data}}}
      )
      const expensesArray = Array.isArray(req.body.expenses) ? req.body.expenses : [req.body];

    if (expensesArray.length === 0) {
      return res.json({ error: 'No expenses provided.' });
    }

    // Loop through the expenses (even if it's just one)
    expensesArray.forEach(expense => {
      let data = {
        description: expense.description || req.body.description,  // Ensure both work
        amount: Number(expense.amount || req.body.amount)          // Ensure both work
      };

      if (data.description === "" || isNaN(data.amount) || data.amount <= 0) {
        return res.json({ error: 'Valid description and amount are required.' });
      }

      // Push the new expense into the expenses array
      userFind.expenses.push(data);
    });

    // Loop through each expense and push it into the user's expenses array
    // data.forEach(expense => {
    //   if (expense.description && !isNaN(expense.amount) && expense.amount > 0) {
    //     userFind.expenses.push({

    //     });
    //   }
    // });
      //userFind.expenses.push(data)
      console.log(userFind)
      await userFind.save()
      return res.json({ message: "Expense saved successfully!", expenses: userFind.expenses });
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