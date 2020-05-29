const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', (req, res) => {
  const { email, password, password2 } = req.body;
  const errors = [];

  // Validation checks
  if (!email || !password || !password2) {
    errors.push({ message: 'Please enter all fields' });
  }

  if (password !== password2) {
    errors.push({ message: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ message: 'Password should be atleast 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      email,
      password,
      password2,
    });
  }
});

module.exports = router;
