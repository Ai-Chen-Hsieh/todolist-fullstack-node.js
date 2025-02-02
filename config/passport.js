const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')


module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())

  //設定驗證的策略
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if(!user){
          return done(null, false, { message: 'That email is not registered.' })
        }
        if (user.password !== password) {
          return done(null, false, { message: 'Email or Password is incorrect.' })
        } else {
          return done(null, user)
        }
      })
      .catch(err => done(err, false))
  }))

  // 序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // 反序列化
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}