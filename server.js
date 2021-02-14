const express = require('express')
const nunjucks = require('nunjucks')
const app = express()

const { port } = require('./config')

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.use(express.static('public'))

app.get('/', function(req, res) {
  res.sendFile('public/main.html', { root: __dirname });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})
