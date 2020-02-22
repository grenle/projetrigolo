const bodyParser = require('body-parser')
const app        = require('express')()
const server     = require('http').Server(app)
const io         = require('socket.io')(server)
const cors       = require('cors')

const word = require('./controllers/word')

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

app.use('/api/words', word)

server.listen(HTTPPORT, CATCHALLIP, () => {
  console.log(`server listening to you babble`)
})