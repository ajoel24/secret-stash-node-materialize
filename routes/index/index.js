const express = require('express');
const {ensureAuth} = require('../../middleware/ensureAuth');

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

router.post('/submit', ensureAuth, (req, res) => {
  const secret = req.body.secret;
})

router.get('/logout', (req, res) => {
  req.logOut();
  req.flash('successMsg', 'You have logged out successfully');
  res.redirect('/login');
});

module.exports = router;
