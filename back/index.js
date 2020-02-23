const bodyParser = require('body-parser')
const express    = require('express')
const app        = express()
const server     = require('http').Server(app)
const io         = require('socket.io')(server)
const cors       = require('cors')

const word = require('./controllers/word')
const signup = require('./controllers/signup')
const signon = require('./controllers/signon')

const log  = require('./utils/log')

require('./auth/auth')
require('dotenv').config()
const {HTTPPORT, CATCHALLIP} = process.env
require('./utils/goMongoose')()
require('./chatter/chatter')(io)

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

io.origins('*:*')

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
})

app.use(express.static('public'))
app.use('/api/words', word)
app.use('/api/signup', signup)
app.use('/api/signon', signon)

server.listen(HTTPPORT, CATCHALLIP, () => {
  log(`API server listening on ${HTTPPORT}`)
})