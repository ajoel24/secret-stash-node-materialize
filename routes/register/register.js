const express = require('express');
const User = require('../../models/User');
const bcrypt = require('bcrypt');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', async (req, res) => {
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

  // After checking all validation
  if (errors.length > 0) {
    res.render('register', {
      errors,
      email,
      password,
      password2,
    });
  } else {
    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        errors.push({ message: 'This email is already registered' });
        return res.render('register', {
          errors,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({ email, password });
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();
        req.flash('successMsg', 'Registration successful. You can login now');
        res.redirect('/login');
      }
    } catch (err) {
      console.log(err);
    }
  }
});

module.exports = router;
