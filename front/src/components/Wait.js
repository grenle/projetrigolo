import React from 'react'

import './Wait.css'

class Wait extends React.Component{
  render(){
    return(
      <div className="text-center">
        <img className="rotate" src="http://localhost/openmoji-svg-color/23F3.svg" alt='' />
        <p>...Please Wait...</p>
      </div>
    )
  }

  componentDidMount(){
    this.props.roomRequest()
  }
}

export default Wait