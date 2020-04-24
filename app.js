const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')


const routes = require('./routes')

const app = express()

app.use(cors())

app.use(bodyParser.json({ extended: true }))

app.use(routes)

if (process.env.NODE_ENV === 'production') {
  const baseDir = process.env.BASE_DIR || './' // /usr/src/app/
  // Serve any static files
  app.use(express.static(baseDir + 'build'))
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(baseDir + 'build/index.html')
  })
}

module.exports = app
