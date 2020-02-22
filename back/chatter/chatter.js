const {User, Rooms} = require('socket.io-rooms')

const alphabet = require('../utils/alphabet')
const revealedInit = require('./revealedInit')

function removeFromArray(xs, o){
  const i = xs.indexOf(o)
  xs.splice(i, 1)
}

function gameOn(client){
  client.emit('gameOn')
  client.emit('gameUpdate', matches[0])
}

class Match{
  constructor(){
    this.fails    = 0
    this.players  = []
    this.word     = 'hms victory'.split('')
    this.revealed = revealedInit(this.word)
    this.letters  = alphabet()
  }
  gameStatus(){
    if(this.fails > 7){ return 'dead' }
    if(this.revealed.includes('_')){
      return 'on'
    }
    return 'live'
  }
  update(letter){
    removeFromArray(this.letters, letter)
    if(this.word.indexOf(letter) === -1){
      this.fails++
    }else{
      this.word.forEach( ( wordLetter, i ) => {
        if(wordLetter.toUpperCase() === letter.toUpperCase()){
          this.revealed[i] = letter          
        }
      })
    }
  }
}


matches = [ new Match() ]

module.exports = (io) => {

  io.on('connection', client => {
    console.log(`receive < user connection ${client.id}`)

    client.on('letter', letter => {
      console.log('letter event', letter)
      matches[0].update(letter)
      const status = matches[0].gameStatus()
      if(status === 'on'){
        client.emit('gameUpdate', matches[0])
      }else{
        client.emit('gameEnd', matches[0], status)
      }
    })

    client.on('roomRequest', () => {
      console.log('receive < roomRequest')
      const roomId = 0
      console.log(`send    > roomResponse/${roomId}`)
      client.emit('roomResponse', roomId)
      setTimeout(gameOn, 1000, client)
    })

  })

}