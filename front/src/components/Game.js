import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import '../utils/chatter'

import Wait from './Wait'

class Game extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      gameOn: false
    }
  }
  render(){
    return(
      <div>
        {this.state.gameOn ? <h2>play</h2> : <Wait/>}
      </div>
    )
  }
}

export default Game