const router = require('express').Router();
const passport = require('passport');


const { isAuthenticated } = require('../helpers/alreadySign');
// Models
const User = require('../models/User');

router.get('/users/signup', isAuthenticated, (req, res) => {
  res.render('users/signup');
});

router.post('/users/signup',  async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password } = req.body;
  console.log(password);
  if(password != confirm_password) {
    errors.push({text: 'Las constraseñas no coinciden.'});
  }
  if(password.length < 4) {
    errors.push({text: 'La contraseña debe contener mínimo 4 carácteres.'})
  }
  if(errors.length > 0){
    res.render('users/signup', {errors, name, email, password, confirm_password});
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({email: email});
    if(emailUser) {
      req.flash('error_msg', 'Éste usuario ya existe');
      res.redirect('/users/signup');
    } else {
      // Saving a New User
      const newUser = new User({name, email, password});
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash('success_msg', 'Usuario registrado!.');
      res.redirect('/users/signin');
      console.log("Registrado");
    }
  }
});

router.get('/users/signin', isAuthenticated , (req, res) => {
  res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/signin',
  failureFlash: true
}));

router.get('/users/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Sesión cerrada correctamente');
  res.redirect('/users/signin');
});
module.exports = router;
