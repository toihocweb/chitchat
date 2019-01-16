import React, { Component } from 'react'
import { Segment, Comment } from '../../../node_modules/semantic-ui-react';
import MessagesHeader from './MessagesHeader';
import MessageForm from './MessageForm';
import './Messages.css'
class Messages extends Component {
  render() {
    return (
      <React.Fragment>
        <MessagesHeader />
        <Segment>
          <Comment.Group className='messages'>

          </Comment.Group>
        </Segment>
        <MessageForm />
      </React.Fragment>
    )
  }
}

export default Messages
