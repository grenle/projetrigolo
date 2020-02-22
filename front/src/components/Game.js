import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

class Game extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      gameOn: false
    }
  }
  render(){
    return(
      <h2>GAME!!!</h2>
    )
  }
}

export default Game