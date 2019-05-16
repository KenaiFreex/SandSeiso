const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../helpers/authIndex');

router.get('/', isAuthenticated, (req, res) => {
  res.render('index');
});

router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;
