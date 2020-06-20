const User = require('../models/User');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = function (passport) {
  // Local authentication
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

  // Google OAuth 2.0 authentication
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        callbackURL:
          'https://secret-stash.herokuapp.com/login/auth/google/dashboard',
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
      },
      function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
          return cb(err, user);
        });
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
