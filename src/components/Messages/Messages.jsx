import React, { Component } from 'react'
import { Segment, Comment } from '../../../node_modules/semantic-ui-react';
import MessagesHeader from './MessagesHeader';
import firebase from '../../firebase'
import MessageForm from './MessageForm';
import './Messages.css'
import Msg from './Msg';

class Messages extends Component {

  state = {
    messageRef: firebase.database().ref('messages'),
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    messages: [],
    messageLoading: true
  }

  componentDidMount() {
    const { channel, user } = this.state
    if (channel && user) {
      this.addListeners(channel.id)
    }
  }

  addListeners = channelID => {
    this.addMessageListener(channelID)
  }

  addMessageListener = channelID => {
    let loadedMessages = []
    this.state.messageRef.child(channelID).on('child_added', snap => {
      loadedMessages.push(snap.val())
      this.setState({
        messageLoading: false,
        messages: loadedMessages
      })
    })
  }

  displayChannelName = channel => channel ? `#${channel.channelName}` : ''


  render() {
    const { messageRef, channel, user, messages } = this.state
    return (
      <React.Fragment>
        <MessagesHeader displayChannelName={this.displayChannelName(channel)}/>
        <Segment>
          <Comment.Group className='messages'>
            {messages.length > 0 && messages.map(msg => (<Msg key={msg.timestamp} message={msg} user={this.state.user} />))}
          </Comment.Group>
        </Segment>
        <MessageForm currentUser={user} messageRef={messageRef} currentChannel={channel} />
      </React.Fragment>
    )
  }
}

export default Messages
