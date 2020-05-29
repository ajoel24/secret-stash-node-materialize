const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('welcome');
});

router.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

router.get('/logout', (req, res) => {
  req.logOut();
  req.flash('successMsg', 'You have logged out successfully');
  res.redirect('/login');
});

module.exports = router;
