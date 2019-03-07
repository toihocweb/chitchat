import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setCurrentChannel } from '../../actions'
import firebase from '../../firebase'
class Starred extends Component {

    state = {
        user: this.props.currentUser,
        userRef: firebase.database().ref('users'),
        starredChannels: [],
        activeChannel: '',
    }

    componentDidMount() {
        if (this.state.user) {
            this.addListeners(this.state.user.uid)
        }
    }

    addListeners = (userId) => {
        this.state.userRef.child(userId).child('starred').on('child_added', snap => {
            const starredChannel = { id: snap.key, ...snap.val() }
            this.setState({
                starredChannels: [...this.state.starredChannels, starredChannel]
            })
        })

        this.state.userRef.child(userId).child('starred').on('child_removed', snap => {
            const channelToRemove = { id: snap.key, ...snap.val() }
            const filteredChannels = this.state.starredChannels.filter(channel => {
                return channel.id !== channelToRemove.id
            })
            this.setState({
                starredChannels: filteredChannels
            })
        })
    }

    setActiveChannel = (channel) => {
        this.setState({ activeChannel: channel.id })
    }

    displayChannels = starredChannels => starredChannels.length > 0 && starredChannels.map(channel => (
        <Menu.Item active={this.state.activeChannel === channel.id} key={channel.id} name={channel.channelName} onClick={() => this.changeChannel(channel)}>
            # {channel.channelName}
        </Menu.Item>
    ))

    changeChannel = (channel) => {
        this.setActiveChannel(channel)
        this.props.setCurrentChannel(channel)
        this.setState({ channel })
        // this.clearNotifications()
    }

    render() {
        const { starredChannels } = this.state
        return (

            <Menu.Menu style={{ padding: '2em 0px' }}>
                <Menu.Item>
                    <span>
                        <Icon name='star' />STARRED
                    </span>
                    ({starredChannels.length})
                </Menu.Item>
                {this.displayChannels(starredChannels)}
            </Menu.Menu>
        )
    }
}

export default connect(null, { setCurrentChannel })(Starred)
