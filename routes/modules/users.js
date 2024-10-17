const express = require('express');
const user = require('../../models/user');
const router = express.Router();

const User = require('../../models/user')

router.get('/login', (req, res) => {
  return res.render('login')
})

router.get('/register', (req, res) => {
  return res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  User.findOne({ email }).then(user => {
    if(user){
      console.log("user already exists.")
      return res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      return User.create({
        name,
        email,
        password
      }).then(() => {
        console.log("user created.")
        res.redirect('/')
      }).catch(err => console.log(err))
    }
  }).catch(err => console.log(err))
})

module.exports = router