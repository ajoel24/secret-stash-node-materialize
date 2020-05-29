require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();

// Template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(expressLayouts);

const PORT = process.env.PORT || 5000;

app.use('/', require('./routes/index/index'));
app.use('/login', require('./routes/login/login'));
app.use('/register', require('./routes/register/register'));

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
