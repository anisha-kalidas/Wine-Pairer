const path = require('path')
const express = require('express')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))

server.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'), (err) => {
      if (err) {
        res.status(500).send(err)
      }
    })
  })


// server.get('*', (req, res) => res.sendFile(path.resolve('server', 'public', 'index.html')))

module.exports = server
