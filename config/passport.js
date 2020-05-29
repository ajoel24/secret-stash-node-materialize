const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          const existingUser = await User.findOne({ email });

          if (!existingUser)
            return done(null, false, {
              message: 'This email is not registered.',
            });

          const passwordMatch = await bcrypt.compare(
            password,
            existingUser.password
          );

          if (!passwordMatch)
            return done(null, false, {
              message: 'Email or password is invalid.',
            });

          return done(null, existingUser);
        } catch (err) {
          console.log(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
