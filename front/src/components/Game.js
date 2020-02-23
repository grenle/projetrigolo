import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

//import '../utils/chatter'

import openSocket from 'socket.io-client'

import Wait  from './Wait'
import Lobby from './Lobby'
import Stage from './Stage'

class Game extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      status   : Lobby,
      socket   : openSocket('http://localhost'),
      user     : {},
      room     : undefined,
      client   : undefined,
      revealed : [],
      letters  : [],
    }
    this.playerStart = this.playerStart.bind(this)
  }

  playerStart(){
    this.setState({status: Wait})
  }

  roomRequest = () => {
    const gamer = ( ({_id, handle}) => ({_id, handle}) )(this.props.gamer)
    console.log(`emit    > roomRequest ${gamer}`)
    this.state.socket.emit('roomRequest', gamer, this.state.user)
  }

  joinroom = num => {
    const { socket } = this.state
    console.log(`emit    > join/${num}`)
    socket.emit('join', num)
  }

  render(){
    const { revealed, alphabet } = this.state
    return(
      <div>
        {React.createElement(
          this.state.status,
          {
            playerStart: this.playerStart,
            roomRequest: this.roomRequest,
            revealed,
            alphabet
          }
        )}
      </div>
    )
  }

  componentDidMount(){

    const {socket} = this.state

    socket.on('connect', () => {
      console.log('receive < connect')
      socket.on('user', u => {
        console.log(`receive < user ${u}`)
        this.setState({user: u})
        console.log(this.state)
      })

      socket.on('roomResponse', roomId => {
        console.log(`receive < roomResponse/${roomId}`)
        this.joinroom(roomId)
      })

      socket.on('gameOn', () => {
        console.log(`receive < gameOn`)
        this.setState({ status: Stage })
        document.addEventListener('keypress', e => {
          console.log(`emit    < letter ${e.key}`)
          socket.emit('letter', e.key)
        })  
      })

      socket.on('message', m => {
        console.log(`receive < gameUpdate ${m}`)
        console.log(`                     ${m.revealed}`)
        console.log(`                     ${m.letters}`)
        console.log(`                     ${m.fails}`)
        console.log(`receive message ${m}`)
        this.setState(m)
      })

    })
  }
}

export default Game