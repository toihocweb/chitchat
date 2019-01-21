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
    messageLoading: true,
    numUniqueUsers: 0,
    searchTerm: '',
    searchResults: [],
    searching: false
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
      this.countUniqueUsers(loadedMessages)
    })

  }

  handleSearchChange = (e) => {
    this.setState({
      searchTerm: e.target.value,
      searching: true
    }, () => this.handleSearchMessages())
  }

  handleSearchMessages = () => {
    const channelMessage = [...this.state.messages]

    const reg = new RegExp(this.state.searchTerm, 'gi')
    const searchResults = channelMessage.reduce((acc, message) => {
      if (
          (message.content && message.content.match(reg)) ||
            (message.user.name && message.user.name.match(reg))
        ) {
          acc.push(message)
      }
      return acc
    }, [])
    this.setState({ searchResults })
    setTimeout(() => {
      this.setState({ searching: false })
    }, 1000);
  }

  displayChannelName = channel => channel ? `#${channel.channelName}` : ''

  countUniqueUsers = messages => {
    const UniquUsers = messages.reduce((acc, message) => {
      if (!acc.includes(message.user.name)) {
        acc.push(message.user.name)
      }
      return acc
    }, [])

    const numberUsers = UniquUsers.length

    this.setState({ numUniqueUsers: numberUsers })
  }

  displayMessages = messages => (
    messages.length > 0 && messages.map(msg => (<Msg key={msg.timestamp} message={msg} user={this.state.user} />))
  )

  render() {
    const { messageRef, channel, user, messages, numUniqueUsers, searchTerm, searchResults, searching } = this.state
    return (
      <React.Fragment>
        <MessagesHeader numUniqueUsers={numUniqueUsers} displayChannelName={this.displayChannelName(channel)} handleSearchChange={this.handleSearchChange} searching={searching} />
        <Segment>
          <Comment.Group className='messages'>
            {searchTerm ? this.displayMessages(searchResults) : this.displayMessages(messages)}
          </Comment.Group>
        </Segment>
        <MessageForm currentUser={user} messageRef={messageRef} currentChannel={channel} />
      </React.Fragment>
    )
  }
}

export default Messages
