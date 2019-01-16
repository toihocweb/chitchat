import React, { Component } from 'react'
import { Segment, Comment } from '../../../node_modules/semantic-ui-react';
import MessagesHeader from './MessagesHeader';
import firebase from '../../firebase'
import MessageForm from './MessageForm';
import './Messages.css'
class Messages extends Component {

  state = {
    messageRef: firebase.database().ref('messages'),
    channel: this.props.currentChannel,
    user : this.props.currentUser
  }

  render() {
    const { messageRef, channel, user } = this.state
    return (
      <React.Fragment>
        <MessagesHeader />
        <Segment>
          <Comment.Group className='messages'>

          </Comment.Group>
        </Segment>
        <MessageForm currentUser = {user} messageRef={messageRef} currentChannel = {channel}/>
      </React.Fragment>
    )
  }
}

export default Messages
