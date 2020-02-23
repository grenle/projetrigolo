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
      status: Lobby,
      socket: openSocket('http://localhost'),
      user: {},
      room: undefined,
      client: undefined,
    }
    this.playerStart = this.playerStart.bind(this)
  }

  playerStart(){
    this.setState({status: Wait})
  }

  roomRequest = () => {
    this.state.socket.emit('roomRequest')
  }

  render(){
    return(
      <div>
        {React.createElement(
          this.state.status,
          {
            playerStart: this.playerStart,
            roomRequest: this.roomRequest
        }
        )}
      </div>
    )
  }

  componentDidMount(){
    const {socket } = this.state
    socket.on('connect', () => {
      console.log('receive < connect')
    //   console.log('emit    > roomRequest')
    //   socket.emit('roomRequest')
      socket.on('roomResponse', roomId => {
        console.log(`receive < roomResponse/${roomId}`)
        // joinroom(roomId)
      })
    })
  }
}

export default Game