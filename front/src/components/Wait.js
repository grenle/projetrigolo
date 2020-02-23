import React from 'react'

import './Wait.css'

class Wait extends React.Component{
  render(){
    return(
      <div className="text-center">
        <img className="rotate" src="http://localhost/openmoji-svg-color/23F3.svg" alt='' />
        <h2>...Please Wait...</h2>
      </div>
    )
  }

  componentDidMount(){
    this.props.roomRequest()
  }
}

export default Wait