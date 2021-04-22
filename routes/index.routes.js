const express = require('express');
const router  = express.Router();

const Sport = require('../models/Sport.model');
const User = require('../models/User.model');

const checkForAuth = (req, res, next) =>{
  if(req.isAuthenticated()){
    return next()
  } else {
    res.redirect('/login')
  }
 }


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/profile', checkForAuth, (req, res, next) => {
  
  User.findById(req.user._id)
  .populate('sports')
  .then((result) => {
    res.render('profile', result);
  })
  .catch((err) => {
    res.render('error')
  })
});

module.exports = router;
