// TO RUN:
// - run `npm start` in terminal -- this is what is running our node server
// - run `npm run start-vr` in another tab in your terminal -- this is what is bundling

const bodyParser = require('body-parser')
const {resolve} = require('path')
const express = require('express')
const app = express()
const router = require('./server/app/routes')

app.use(require('volleyball'))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(express.static(resolve(__dirname, 'public')))

app.use('/input', router)

if(!module.parent) app.listen(4000, console.log('Listening at port 4000'))

module.exports = app
