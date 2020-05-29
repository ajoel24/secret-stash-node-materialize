require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./config/db');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();
connectDB();

// Template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(expressLayouts);

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

app.use((req, res, next) => {
  res.locals.successMsg = req.flash('successMsg');
  res.locals.errorMsg = req.flash('errorMsg');
  next();
});

const PORT = process.env.PORT || 5000;

app.use('/', require('./routes/index/index'));
app.use('/login', require('./routes/login/login'));
app.use('/register', require('./routes/register/register'));

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
