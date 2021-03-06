const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Oops... Inicia tu sesión antes.');
  res.redirect('/users/signin');
};

module.exports = helpers;
