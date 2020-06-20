module.exports = {
  ensureAuth: (req, res, next) => {
    if (req.isAuthenticated()) return next();

    req.flash('errorMsg', 'Please log in to continue');
    res.redirect('/login');
  },
};
