const express = require('express');
const router = express.Router();
// Models

// Helpers
const { isAuthenticated } = require('../helpers/auth');

router.get('/config/utilities/clean-area', (req, res) => {

    res.render('config/utilities/clean-area');
  
  
  });

router.get('/config/advanced/motor-speed', (req, res) => {

    res.render('config/advanced/motor-speed');
  
  
  });
  
router.get('/config/advanced/controller-outs', (req, res) => {

    res.render('config/advanced/controller-outs');
  
  
  });
  
  module.exports = router;