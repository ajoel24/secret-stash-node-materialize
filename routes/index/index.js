const express = require('express');
const User = require('../../models/User');
const { ensureAuth } = require('../../middleware/ensureAuth');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('welcome');
});

router.get('/dashboard', ensureAuth, (req, res) => {
  res.render('dashboard');
});

router.get('/submit', ensureAuth, (req, res) => {
  res.render('submit');
});

router.post('/submit', ensureAuth, async (req, res) => {
  const secret = req.body.secret.trim();
  const errors = [];

  if (secret == '') {
    errors.push({ message: 'Secret is empty' });
  }

  if (errors.length > 0) {
    res.render('submit', { errors });
  } else {
    try {
      
    } catch(err) {
      console.log(err);
    }
  }
});

router.get('/logout', (req, res) => {
  req.logOut();
  req.flash('successMsg', 'You have logged out successfully');
  res.redirect('/login');
});

module.exports = router;
