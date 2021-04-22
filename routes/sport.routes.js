const express = require('express');
const router  = express.Router();

const Sport = require('../models/Sport.model');
const User = require('../models/User.model');

/* MIDDLEWARE de checkforAuth */

const checkForAuth = (req, res, next) =>{
  if(req.isAuthenticated()){
    return next()
  } else {
    res.redirect('/login')
  }
 }

/* GET home page */
router.get('/new', checkForAuth, (req, res) => {
  res.render('sports/newSport');
});


router.post('/new', (req, res)=>{
  Sport.create(req.body)
  .then((result) => {
    User.findByIdAndUpdate(req.user._id, {$push: {sports: result._id}})
    .then((result) => {
      res.redirect('/profile')
    })
  })
  .catch((err) => {
    res.render('error')
  });
})


module.exports = router;
