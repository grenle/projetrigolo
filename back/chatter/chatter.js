/*
https://www.npmjs.com/package/socket.io-rooms
https://github.com/amkurian/simple-chat/blob/master/index.html
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
*/

const {User, Rooms} = require('socket.io-rooms')

const alphabet = require('../utils/alphabet')
const revealedInit = require('./revealedInit')

const getword = require('../utils/getword')

function removeFromArray(xs, o){
  const i = xs.indexOf(o)
  if(i !== -1){
    xs.splice(i, 1)
  }
}

function gameOn(u, r, match){
  matches[0].uid = u.uid // is this necessary?
  const m = {type: 'gameupdate', gamestate: match}
  r.send(0, {type: 'gameon'})
  r.send(0, m)
}

class Match{
  constructor(){
    this.fails    = 0
    this.players  = {}
    this.word     = null
    this.revealed = null
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
    console.log(`REMOVING ${letter} from ${this.letters}`)
    removeFromArray(this.letters, letter)
    console.log(`REMOVED  ${letter} from ${this.letters}`)
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
    const user = new User()
    client.emit('user', user)

    client.on('reshuffle', roomId => {
      getword().then( x => {
        matches[0].word = x.word.toLowerCase().split('')
        matches[0].revealed = revealedInit(x.word.split(''))
        matches[0].letters = alphabet()
        matches[0].fails = 0
        setTimeout(gameOn, 1000, user, Rooms, matches[0])
        console.log('matches', matches[0])
      })
    })

    client.on('roomRequest', (gamer) => {
      console.log('receive < roomRequest')
      const roomId = 0 // need dispatch
      Object.assign(matches[roomId].players, gamer)
      console.log('players', matches[roomId].players)
      console.log(`send    > roomResponse/${roomId}`)
      client.emit('roomResponse', roomId)
      console.log(`user ${user} joining room ${roomId}`)
      console.log(user)
      Rooms.join(roomId, user, io, client)
      if(matches[roomId].word){
        setTimeout(gameOn, 1000, user, Rooms, matches[roomId])
      }else{
        getword().then( x => {
          matches[roomId].word = x.word.toLowerCase().split('')
          matches[roomId].revealed = revealedInit(x.word.split(''))
          setTimeout(gameOn, 1000, user, Rooms, matches[roomId])
        })
      }
    })

    client.on('letter', letter => {
      console.log('letter event', letter)
      matches[0].update(letter)
      const status = matches[0].gameStatus()
      if(status === 'on'){
        console.log(`emiting game update`)
        // client.emit('gameUpdate', matches[0])
        matches[0].uid = user.uid // is this necessary?
        const m = {type: 'gameupdate', gamestate: matches[0]}
        Rooms.send(0, m)
      }else{
        matches[0].uid = user.uid // is this necessary?
        const m = {type: 'gameupdate', gamestate: matches[0]}
        Rooms.send(0, m)
      }
    })

    client.on('disconnect', () => {
      console.log(`user ${user} disconnect`)
      Rooms.leave(user)
    })

  })

}