import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Header, Icon, Form, Segment, Button, Message } from '../../node_modules/semantic-ui-react';
import firebase from '../firebase'

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSunmit = (e) => {
    e.preventDefault()
    if (this.isFormValid()) {
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((signedUser) => {
      }).catch(err => {
        console.log(err)
      })
    }
  }

  isFormValid = () => {
    return !this.isFormEmpty(this.state) ? true : false
  }



  isFormEmpty = ({ email, password }) => {
    return !email.length || !password.length
  }

  render() {
    const { email, password } = this.state
    const color = 'teal'
    return (
      <Grid verticalAlign='middle' textAlign='center' className='register' >
        <Grid.Column style={{ maxWidth: 600 }}>
          <Header icon color={color} as='h2'>
            <Icon name='paw' size='tiny' />Login to DevChat
          </Header>
          <Segment>
            <Form onSubmit={this.handleSunmit}>
              <Form.Input iconPosition='left' placeholder="Email" icon='mail' name='email' onChange={this.handleChange} value={email} type='email' />
              <Form.Input iconPosition='left' placeholder="Password" icon='lock' name='password' onChange={this.handleChange} value={password} type='password' />
              <Button fluid color={color}> Login </Button>
            </Form>
            <Message warning>
              <Icon name='help' />
              Dont have an account? <Link to='register'> Register</Link>.
               </Message>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Login
