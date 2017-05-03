const express = require('express')
const router = express.Router()
const analyzeSpeech = require('../analyze.js')

module.exports = router

router.post('/', (req, res, next) => {
  let sentence = req.body;
  let sentenceAnalysis = analyzeSpeech(sentence);  
  
  res.status(204).send(sentenceAnalysis)
})

