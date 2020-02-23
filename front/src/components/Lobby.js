import React from 'react'
import Button from 'react-bootstrap/Button'

class Lobby extends React.Component{
  render(){
    return(
      <div>
        <h2>Click play any time.</h2>
        <div className="text-center">
          <Button onClick={this.props.playerStart}>Play!</Button>
        </div>
      </div>
    )
  }
}

export default Lobby