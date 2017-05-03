const bodyParser = require('body-parser')
const {resolve} = require('path')
const express = require('express')
const app = express()
const router = require('./server/app/routes')



app.use(require('volleyball'))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(express.static(resolve(__dirname, 'browser')))

app.use('/input', router)

app.listen(3000, console.log('Listening at port 3000'))
