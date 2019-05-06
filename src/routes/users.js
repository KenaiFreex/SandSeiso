const express = require('express');
const router = express.Router();

router.get('/users/signin', (req,res) => {

    res.send("Signin")
});


router.get('/users/signup', (req,res) => {

    res.send('SignUp')
    
});


module.exports = router;