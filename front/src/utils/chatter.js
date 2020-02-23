import openSocket from 'socket.io-client';

import log from './log'

const socket = openSocket('http://localhost')

let user = {}, room, client

function joinroom(num){
  console.log(`emiting join/${num}`)
  socket.emit('join', num)
}

function send(msg){
  socket.emit('message', {type: 'TALK', body: msg})
}

socket.on('connect', () => {
  console.log('receive < connect')
  console.log('emit    > roomRequest')
  socket.emit('roomRequest')
  socket.on('roomResponse', roomId => {
    console.log(`receive < roomResponse/${roomId}`)
    joinroom(roomId)
  })
})

socket.on('gameOn', () => {
  console.log(`receive < gameOn`)
})


socket.on('gameUpdate', thing =>{
  console.log(thing)
  console.log(`receive < gameUpdate ${thing.revealed}`)
  console.log(`receive < gameUpdate ${thing.letters}`)
  console.log(`receive < gameUpdate ${thing.fails}`)
})


socket.on('suggestRoom', roomid => {
  console.log(`received suggestRoom//${roomid}`)
  joinroom(roomid)
})