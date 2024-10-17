const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

router.get('/', (req, res) => {
  console.log("all req", req)
  Todo.find()
    .lean()
    .sort({ _id: 'asc' }) // desc
    .then(todos => {
      res.render('index', { todos })
    })
    .catch(error => console.error(error))
})

module.exports = router
