import React from 'react'

import './Stage.css'

class Stage extends React.Component{
  hangojis = [
    '1F601', '1F601', '1F642',
    '1F642', '1F610', '1F928',
    '1F915', '26B0'
  ]
  render(){
    const hangojiIndex = this.props.fails
    const hangoji      = this.hangojis[hangojiIndex]
    console.log(hangoji)
    const alphabet = [...new Array(26)].map( (_, i) => String.fromCodePoint(i+97) )
    return(
      <div className="text-center">
        <img src={`http://localhost/openmoji-svg-color/${hangoji}.svg`} alt='' />
        <p>
          {this.props.revealed.map( (x, i) => {
            return <span key={i}>{x}</span>
          })}
        </p>
        <p>
          {alphabet.map( (letter, i) => {
            if(this.props.letters.includes(letter)){
              return <span className="keyon"  key={i}>{letter}</span>
            }else{
              return <span className="keyoff" key={i}>{letter}</span>
            }
          })}
        </p>
      </div>
    )
  }
}

export default Stage