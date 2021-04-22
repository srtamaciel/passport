const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt')
const passport = require('passport')

const User = require('../models/User.model')



/* GET signup page */
router.get('/signup', (req, res, next) => {
  res.render('signup');
});

/* POST sign up */
router.post('/signup', (req, res)=> {
  const {username, password} = req.body
  //Verificar que el usuario y contraseña no estén vacíos
  if(username === '' || password === ''){
    res.render('signup', {errorMessage: 'Tienes que rellenar todos los campos'})
  }
  //Verificar que el usuario que intentas crear no exista ya
User.findOne({username})
.then((user) => {
  if(user){
    res.render('signup',  {errorMessage: 'Este usuario ya existe'})
  } else {
    const hashedPassword = bcrypt.hashSync(password, 10)
    User.create({username, password: hashedPassword})
    .then(() => {
      res.redirect('/login')
    })
  }
})
.catch((err) => {
  res.send(err)
});
})

/* GET login page */
router.get('/login', (req, res) => {
  res.render('login', {errorMessage: req.flash('error')})
})

/* POST login page */
router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true
}))

/* GET logout page */
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})


/* router.get('/private-page', checkForAuth, (req, res) =>{
  res.render('private')
}) */

module.exports = router;
