const express = require('express');
const router = express.Router();

const User = require('../models/evasor');

// Models

// Helpers
const { isAuthenticated } = require('../helpers/auth');

router.get('/evasion', isAuthenticated, (req, res) => {

    res.render('evasion/evasion');
  
  
  });
  
  module.exports = router;