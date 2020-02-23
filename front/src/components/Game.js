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
      fails    : 0
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
    let { revealed, letters } = this.state
    if(!letters){ letters = [] }
    let fails = this.state.fails > 7 ? 7 : this.state.fails
    return(
      <div>
        {React.createElement(
          this.state.status,
          {
            playerStart: this.playerStart,
            roomRequest: this.roomRequest,
            revealed,
            letters,
            fails
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

      socket.on('message', m => {
        if(m.type === 'gameon'){
          console.log(`receive < gameOn`)
          this.setState({ status: Stage })
          document.addEventListener('keypress', e => {
            console.log(`emit    < letter ${e.key}`)
            socket.emit('letter', e.key)
          })
        }
        if(m.type === 'gameupdate'){
          console.log(m.gamestate)
          console.log(`                     ${m.gamestate.revealed}`)
          console.log(`                     ${m.gamestate.letters}`)
          console.log(`                     ${m.gamestate.fails}`)
          console.log(`receive message ${m}`)
          this.setState(m.gamestate)
          if(m.gamestate.fails > 6){
            socket.emit('reshuffle', this.state.room)
          }
        }
      })

    })
  }
}

export default Game