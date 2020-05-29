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

app.get('/', (req, res) => res.render('welcome'));

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
