const router = require('express').Router();
const passport = require('passport');

// Models
const User = require('../models/User');

router.get('/users/signup', (req, res) => {
  res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password } = req.body;
  console.log(password);
  if(password != confirm_password) {
    errors.push({text: 'Passwords do not match.'});
    console.log("La constraseña no coincide");
  }
  if(password.length < 4) {
    errors.push({text: 'Passwords must be at least 4 characters.'})
    console.log("Password menor de 4 caracteres");
  }
  if(errors.length > 0){
    res.render('users/signup', {errors, name, email, password, confirm_password});
    console.log("Vuelve a intentarlo")
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({email: email});
    if(emailUser) {
      req.flash('error_msg', 'The Email is already in use.');
      console.log("Usuario ya registrado")
      res.redirect('/users/signup');
    } else {
      // Saving a New User
      const newUser = new User({name, email, password});
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash('success_msg', 'You are registered.');
      res.redirect('/users/signin');
      console.log("Registrado");
    }
  }
});

router.get('/users/signin', (req, res) => {
  res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
  successRedirect: '/control-manual',
  failureRedirect: '/users/signin',
  failureFlash: true
}));

router.get('/users/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out now.');
  res.redirect('/users/signin');
});
module.exports = router;
