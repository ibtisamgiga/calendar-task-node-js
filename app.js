const express = require('express');
const mongoose = require('mongoose');
const authRoutes=require('./routes/authRoutes')
const eventRoutes=require('./routes/eventRoutes')
const allevent=require('./routes/alldayRoutes')
const cookieParser=require('cookie-parser')
const{requireAuth, checkUser}=require('./middleware/authmiddleware')
const app = express();
const port=process.env.PORT
const dbURI=process.env.DBURL


// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())


// database connection
//const dbURI = 'mongodb+srv://calendar:Abcd@mycluster.gunmmxp.mongodb.net/calendar';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {app.listen(port)
    console.log('port',port)
    console.log('db connected')
  
  })
  .catch((err) => console.log(err));

/// routes
app.get('*',checkUser)
app.get('/', requireAuth,(req, res) => res.render('home'));
//app.get('/smoothies',requireAuth, (req, res) => res.render('index'));
app.get('/create-event',requireAuth,(req, res) => res.render('create-event'))
app.get('/create-allevent',requireAuth,(req, res) => res.render('create-all'))

app.use(authRoutes)

app.use('/events',eventRoutes)
app.use('/allevents',allevent)
