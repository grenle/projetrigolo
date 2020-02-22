import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Button from 'react-bootstrap/Button'

import Getin from './components/Getin'
import Game  from './components/Game'

const processAuth = require('./utils/processAuth')

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      success: false,
      data   : null
    }
    this.serverauth = this.serverauth.bind(this)
    this.logout     = this.logout.bind(this)
  }
  async serverauth(credentials){
    const res = await processAuth(credentials)
    console.log(`RES: ${res}`)
    this.setState(res)
    console.log(this.state)
  }
  logout(){
    this.setState({ success: false, data: null })
  }
  render(){
    return (
      <div className="container-fluid">
        <h1>Emojiland</h1>
        {this.state.success ? <Button onClick={this.logout}>logout</Button> : null}
        {this.state.success ? <Game/> : <Getin serverauth={this.serverauth}/>}
      </div>
    )
  }
}

export default App
