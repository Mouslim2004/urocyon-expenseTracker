const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const session = require('express-session')
const app = express()

mongoose.connect('mongodb://localhost:27017/expense_db') // { useNewUrlParser: true, useUnifiedTopology: true }

const db = mongoose.connection
db.on('error', () => {
  console.log('Connection to database failed!')
})
db.once('open', () => {
  console.log('Database connected successfully!')
})

const Expense = require('./model/User')

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

// app.get('/login',(req,res) => {
//   res.render('login')
// })

// app.post('/login', async (req,res) => {
//   try{
//     const user = await User.findOne({email: req.body.email})
//     if(user.password === req.body.password){
//       res.render('expense', {user: user})
//       //res.redirect('/expense')
//       //req.session.userId = user._id; 
//     } else {
//       return res.redirect('/login')
//     }
//   } catch {
//     return res.redirect('/login')
//   }
// })

// app.post('/signup',async (req,res) => {
//   let data = {
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password
//   }
//   if(data.name == "" || data.email == "" || data.password == ""){
//       //req.flash('msg','Please fill the form')
//       res.redirect('/signup')
//   } else {
//      await User.insertMany([data])
//      res.render('login')
//   }
// })

// app.get('/signup',(req,res) => {
//   res.render('signup')
// })


app.post('/tracker',async (req,res) => {
  
  console.log('Received data:', req.body);
  try {
    let data = {
      description: req.body.description,
      amount: Number(req.body.amount)
    }

    if(data.description == "" || isNaN(data.amount) || data.amount == ""){
     return res.json({ error: 'Description and amount are required.' });
    }

      const expense = await Expense.insertMany([data])
      console.log(expense)
      return res.json({ message: "Expense saved successfully!", data: expense });
    

  } catch(error){
    return res.json({error: 'Error adding expense'})
  }
  
})

app.get('/expense', async (req,res) => { 
  const transactions = await Expense.find()
   // Calculate total positive and negative amounts
   const totals = transactions.reduce(
    (acc, transaction) => {
      if (transaction.amount > 0) {
        acc.positiveTotal += transaction.amount;
      } else if (transaction.amount < 0) {
        let converse = 0;
        converse += transaction.amount;
        acc.negativeTotal += converse * (-1);
      }
      return acc;
    },
    { positiveTotal: 0, negativeTotal: 0 }
  )
  const overallTotal = totals.positiveTotal + (totals.negativeTotal * (-1));
  res.render('expense', {totals, transactions, overallTotal})
})

app.post('/:description', async (req,res)=>{
  try{
    let destroy = await Expense.deleteMany({description: req.params.description})
    if(destroy.deletedCount === 1){
      console.log(`Successfully deleted one document with the description: ${req.params.description}`);
    } else {
      console.log('No document found with that description');
    }
    console.log(destroy)
    res.json(destroy)
  } catch(error){
    console.error(error)
  }
  
})

// app.get('/expense/:inputValue', async (req, res) => {
//   try{
//     let search = await Expense.findOne({description: req.params.inputValue })
//     if(search){
//       res.json(search)
//     } else {
//       res.status(404).json({ message: 'Description not found' });
//     }
//   }catch(error){
//     console.log(error)
//     res.status(500).json({ message: 'Server error' });
//   }
 
// })
const PORT = process.env.PORT || 5173

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})