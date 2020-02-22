const bodyParser = require('body-parser')
const app        = require('express')()
const server     = require('http').Server(app)
const io         = require('socket.io')(server)
const cors       = require('cors')

require('./chatter/chatter')(io)

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

io.origins('*:*')

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
})

server.listen(80, '0.0.0.0', () => {
  console.log(`server listening to you babble`)
})