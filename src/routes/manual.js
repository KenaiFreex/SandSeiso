const express = require('express');
const router = express.Router();
// Models

// Helpers
const { isAuthenticated } = require('../helpers/auth');

router.get('/control-manual', (req, res) => {

    res.render('Control-manual/manualDirection');
  
  
  });
  
  module.exports = router;