require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const bodyParser = require('body-parser')
const dal = require('./dal')
const nodeHTTPError = require('node-http-error')
app.use(bodyParser.json())

app.get('/', function(req, res, next) {
  res.send('Welcome to the Instruments api.')
})

app.get('/instruments/:instrumentID', function(req, res, next) {
  const instrumentID = req.params.instrumentID
  dal.getInstrument(instrumentID, function(err, data) {
    if (err) {
      next(new nodeHTTPError(err.status, err.message, err))
      return
    }
    res.status(200).send(data)
  })
})

app.use(function(err, req, res, next) {
  console.log(
    'ERROR! ',
    'METHOD: ',
    req.method,
    ' PATH',
    req.path,
    ' error:',
    JSON.stringify(err)
  )
  res.status(err.status || 500)
  res.send(err)
})

app.listen(port, () => console.log('API is up', port))
