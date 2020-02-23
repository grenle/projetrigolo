import React from 'react'

import './Stage.css'

class Stage extends React.Component{
  render(){
    return(
      <div className="text-center">
        <img src='http://localhost/openmoji-svg-color/1F601.svg' alt='' />
        <p>
          {this.props.revealed.map( (x, i) => {
            return <span key={i}>{x}</span>
          })}
        </p>
      </div>
    )
  }
}

export default Stage