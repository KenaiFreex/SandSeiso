const express = require('express');
const router = express.Router();

router.get('/control-manual', (req, res) => {

    res.render('Control-manual/manualDirection');
  
  
  });
  
  router.get('/prueba', (req, res) => {
  
    res.render('Control-manual/socket-prueba');
  
  
  });

  module.exports = router;