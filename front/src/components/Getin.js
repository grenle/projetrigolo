import React from 'react'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import Signin from './Signin'

import './Getin.css'

class Getin extends React.Component{
  render(){
    return(
      <Tabs>
        <Tab eventKey="signin" title="sign in">
          <Signin serverauth={this.props.serverauth}></Signin>
        </Tab>
        <Tab eventKey="signon" title="sign up">
          <h1>sign up</h1>
        </Tab>
      </Tabs>
    )
  }
}

export default Getin