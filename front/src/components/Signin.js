import React  from 'react'
import Form   from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class Signin extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.signin = this.signin.bind(this)
  }
  signin(e){
    e.preventDefault()
    this.props.serverauth(this.state)
  }
  render(){
    return(
      <Form className="p-2">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
          type="email" placeholder="Enter email"
          value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>
          <Form.Text className="text-muted">
            We'll not never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
          type="password" placeholder="Password"
          value={this.state.password} onChange={e => this.setState({password: e.target.value})}/>
          <Form.Text className="text-muted">
            Your password will be properly hashed away from our staff's eyes
          </Form.Text>
        </Form.Group>
        <Button onClick={this.signin} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    )
  }
}

export default Signin