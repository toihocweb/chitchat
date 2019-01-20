import React, { Component } from 'react'
import { Segment, Header, Icon, Input } from '../../../node_modules/semantic-ui-react';

class MessagesHeader extends Component {
    render() {
        const { displayChannelName, numUniqueUsers } = this.props
        console.log("num: " ,numUniqueUsers)
        return (
            <Segment clearing>
                <Header fluid='true' as='h2' floated='left' style={{ marginBottom: 0 }}>
                    <span>{displayChannelName} <Icon name={"star outline"} color='black' /></span>
                    <Header.Subheader>{numUniqueUsers} Users </Header.Subheader>
                </Header>
                <Header floated='right'>
                    <Input size='mini' icon='search' name='searchTerm' placeholder='Search Messages' />
                </Header>
            </Segment>
        )
    }
}

export default MessagesHeader
