import React, { Component } from 'react'
import { Segment, Header, Icon, Input } from '../../../node_modules/semantic-ui-react';

class MessagesHeader extends Component {
    render() {
        const { displayChannelName, numUniqueUsers,handleSearchChange,searchTerm,searching,handleStar,isChannelStarred } = this.props
        // console.log("num: " ,numUniqueUsers)
        return (
            <Segment clearing>
                <Header fluid='true' as='h2' floated='left' style={{ marginBottom: 0 }}>
                    <span>{displayChannelName}<Icon name={isChannelStarred ? 'star' : 'star outline'} color={isChannelStarred ? 'yellow' : 'black'} onClick={handleStar} /></span>
                    <Header.Subheader>{numUniqueUsers} Users </Header.Subheader>
                </Header>
                <Header floated='right'>
                    <Input size='mini' icon='search' name='searchTerm' placeholder='Search Messages' onChange={handleSearchChange} value={searchTerm} loading={searching}/>
                </Header>
            </Segment>
        )
    }
}

export default MessagesHeader
