import openSocket from 'socket.io-client';

import log from './log'

const socket = openSocket('http://localhost')

let user = {},room, client

function joinroom(num){
  console.log(`emiting join/${num}`)
  socket.emit('join', num)
}

function send(msg){
  socket.emit('message', {type: 'TALK', body: msg})
}

socket.on('connect', (c) => {
  log('connect...', socket.id)
  const usid = `YOUYOU${new Date().valueOf().toString()}`
  console.log(`sending identification`)
  socket.emit('identification', usid)
  socket.on('user', u => {
    user = u
  })
  send(`${socket.id} prout prout prout`)
  socket.emit('letter', {usid, letter: 'a'})
})