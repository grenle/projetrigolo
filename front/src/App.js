import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Getin from './components/Getin'

const processAuth = require('./utils/processAuth')

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      success: false,
      data   : null
    }
    this.serverauth = this.serverauth.bind(this )
  }
  async serverauth(credentials){
    const res = await processAuth(credentials)
    console.log(`RES: ${res}`)
    this.setState(res)
    console.log(this.state)
  }
  render(){
    return (
      <div className="container-fluid">
        <h1>Emojiland</h1>
        <Getin serverauth={this.serverauth}></Getin>
      </div>
    )
  }
}

export default App
