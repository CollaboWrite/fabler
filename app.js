// var path = require('path')
// var bodyParser = require('body-parser')
var {resolve} = require('path')
var express = require('express')
var app = express()

app.use(require('volleyball'))

// app.use(bodyParser.urlencoded({extended: true}))
// app.use(bodyParser.json())

app.use(express.static(resolve(__dirname, 'phrase-matcher')))

app.listen(8080, console.log('Listening at port 8080'))