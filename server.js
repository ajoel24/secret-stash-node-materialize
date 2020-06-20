if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./config/db');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();
connectDB();
require('./config/passport')(passport);

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(expressLayouts);

app.use((req, res, next) => {
  res.locals.successMsg = req.flash('successMsg');
  res.locals.errorMsg = req.flash('errorMsg');
  res.locals.error = req.flash('error');
  next();
});

const PORT = process.env.PORT || 5000;

app.use('/', require('./routes/index/index'));
app.use('/login', require('./routes/login/login'));
app.use('/register', require('./routes/register/register'));

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
