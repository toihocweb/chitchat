import React, { Component } from 'react'
import { Segment, Input, Button } from '../../../node_modules/semantic-ui-react';
import firebase from '../../firebase'
class MessageForm extends Component {
  state = {
    message: '',
    isLoading: false,
    errors: [],
    channel: this.props.currentChannel,
    user: this.props.currentUser
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  createMessage = () => {
    const message = {
      content: this.state.message,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.state.user.uid,
        name: this.state.user.displayName,
        avatar: this.state.user.photoURL,
      }
    }
    return message
  }

  handleSubmit = () => {
    const { messageRef } = this.props
    const { message, errors, isLoading, channel } = this.state
    if (message) {
      // send message
      this.setState({ isLoading: true })
      messageRef.child(channel.id).push().set(this.createMessage()).then(() => {
        this.setState({ isLoading: false, message: '', errors: [] })
      }).catch(err => {
        this.setState({
          isLoading: false,
          errors: this.state.errors.concat(err.message)
        })
      })
    } else {
     
      this.setState({
        errors: errors.concat({ message: "Add a message" })
      })
    } 
  }



  render() {
    const { errors,message } = this.state
    return (
      <Segment className='message__form' size='small'>
        <Input value={message} className={errors.some(error => error.message.includes('message')) ? "error" : ""} fluid name='message' onChange={this.handleChange} style={{ marginBottom: '0.7em' }} label={<Button icon={'add'} />}  labelPosition='left' placeholder='Write Your Message' />
        <Button.Group icon widths='2'>
          <Button color='orange' content='Add Reply' labelPosition='left' icon='edit' onClick={this.handleSubmit} />
          <Button color='teal' content='Upload Media' labelPosition='right' icon='cloud upload' />
        </Button.Group>
      </Segment>
    )
  }
}

export default MessageForm
