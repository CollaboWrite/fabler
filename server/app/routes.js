const express = require('express')
const router = express.Router()
const analyzeSpeech = require('../sentiment.js')

module.exports = router

router.post('/', (req, res, next) => {
  let sentence = req.body;
  analyzeSpeech(sentence);  
  
  res.sendStatus(204)
})

