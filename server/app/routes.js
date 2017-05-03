const express = require('express')
const router = express.Router()
const analyzeSpeech = require('../analyze.js')

module.exports = router

router.post('/', (req, res, next) => {
  let {sentence} = req.body;
  analyzeSpeech(sentence)
    .then((response) => res.status(201).send(response))
    .catch(console.error)
})

