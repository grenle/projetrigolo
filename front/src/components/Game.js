import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

//import '../utils/chatter'

import Wait  from './Wait'
import Lobby from './Lobby'

class Game extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      status: Lobby
    }
    this.playerStart = this.playerStart.bind(this)
  }
  playerStart(){
    this.setState({status: Wait})
  }
  render(){
    return(
      <div>
        {React.createElement(this.state.status, {playerStart: this.playerStart})}
      </div>
    )
  }
}

export default Game