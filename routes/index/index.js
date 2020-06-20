const express = require('express');
const User = require('../../models/User');
const { ensureAuth } = require('../../middleware/ensureAuth');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('welcome');
});

router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const users = await User.find({ secrets: { $ne: null } });

    if (users) {
      res.render('dashboard', { users });
    } else {
      res.render('dashboard');
    }
  } catch (err) {
    console.log(err);
  }
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
      const user = await User.findById(req.user._id);

      if (user) {
        user.secrets.push(secret);
        await user.save();
        req.flash('successMsg', 'Secret added successfully');
        res.redirect('/dashboard');
      } else {
        req.flash('errorMsg', 'User not found');
        res.redirect('/dashboard');
      }
    } catch (err) {
      console.log(err);
    }
  }
});

router.get('/logout', (req, res) => {
  req.flash('successMsg', 'You have logged out successfully');
  res.redirect('/login');
  req.session.destroy();
});

module.exports = router;
