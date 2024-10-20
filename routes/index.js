const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const todos = require('./modules/todos')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')


// 匹配越寬鬆的需要放在越後面 
router.use('/todos', authenticator, todos)
router.use('/users', users)
router.use('/', authenticator, home)


module.exports = router
