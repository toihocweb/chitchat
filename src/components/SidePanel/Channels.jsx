import React, { Component } from 'react'
import { Menu, Icon, Modal, Form, Input, Button, Label } from '../../../node_modules/semantic-ui-react';
import { connect } from 'react-redux'
import firebase from '../../firebase'
import { setCurrentChannel } from '../../actions';
class Channels extends Component {
    state = {
        activeChannel: "",
        user: this.props.currentUser,
        channel: null,
        channels: [],
        channelName: '',
        channelDetails: '',
        modal: false,
        channelsRef: firebase.database().ref(`channels`),
        firstLoad: true,
        messagesRef: firebase.database().ref(`messages`),
        notifications: [],
    }
    setFirstChannel = () => {
        const firstChannel = this.state.channels[0]
        if (this.state.firstLoad && this.state.channels.length > 0) {
            this.props.setCurrentChannel(firstChannel)
            this.setActiveChannel(firstChannel)
            this.setState({channel : firstChannel})
        }
        this.setState({ firstLoad: false, activeChannel: firstChannel.id })
    }
    addListeners = () => {
        let loadedChannels = []
        this.state.channelsRef.on('child_added', snap => {
            loadedChannels.push(snap.val())
            this.setState({
                channels: loadedChannels
            }, () => this.setFirstChannel())
            this.addNotificationListener(snap.key)
        })
    }

    addNotificationListener = (channelId) => {
        this.state.messagesRef.child(channelId).on('value', snap => {
            if (this.state.channel) {
                this.handleNotifications(channelId, this.state.channel.id, this.state.notifications, snap)
            }
        })
    }

    handleNotifications = (channelId, setCurrentChannelId, notifications, snap) => {
        let lastTotal = 0
        let index = notifications.findIndex(notification => notification.id === channelId)
        if (index !== -1) {
            if (channelId !== setCurrentChannelId) {
                lastTotal = notifications[index].total
                if (snap.numChildren() - lastTotal > 0) {
                    notifications[index].count = snap.numChildren() - lastTotal
                }
            }
            notifications[index].lasknowTotal = snap.numChildren()
        } else {
            notifications.push({
                id: channelId,
                total: snap.numChildren(),
                lasknowTotal: snap.numChildren(),
                count: 0
            })
        }
        this.setState({ notifications })
    }
    componentDidMount() {
        this.addListeners()
    }

    componentWillUnmount() {
        this.removeListeners()
    }

    removeListeners = () => {
        this.state.channelsRef.off()
    }

    closeModal = () => {
        this.setState({
            modal: false
        })
    }

    openModal = () => {
        this.setState({
            modal: true
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    isFormValid = ({ channelName, channelDetails }) => channelName && channelDetails

    handleSubmit = () => {
        if (this.isFormValid(this.state)) {
            const key = this.state.channelsRef.push().key
            this.state.channelsRef.child(key).update({
                createBy: {
                    name: this.state.user.displayName,
                    photoURL: this.state.user.photoURL
                },
                id: key,
                channelName: this.state.channelName,
                channelDetails: this.state.channelDetails,
            }).then(() => {
                this.setState({
                    channelName: '',
                    channelDetails: '',
                    modal: false
                })
            })
        }
    }

    setActiveChannel = (channel) => {
        this.setState({ activeChannel: channel.id })
    }

    changeChannel = (channel) => {
        this.setActiveChannel(channel)
        this.props.setCurrentChannel(channel)
        this.setState({ channel })
        this.clearNotifications()
    }

    clearNotifications = () => {
        let index = this.state.notifications.findIndex(notification => notification.id === this.state.channel.id)
        if (index !== -1) {
            let updatedNotifications = [...this.state.notifications]
            updatedNotifications[index].total = this.state.notifications[index].lasknowTotal
            updatedNotifications[index].count = 0
            this.setState({ notifications: updatedNotifications })
        }
    }


    getNotificationCount = (channel) => {
        let count = 0
        this.state.notifications.forEach(notification => {
            if (notification.id === channel.id) {
                count = notification.count
            }
        })
        if (count > 0) return count
    }
    displayChannels = channels => channels.length > 0 && channels.map(channel => (
        <Menu.Item active={this.state.activeChannel === channel.id} key={channel.id} name={channel.channelName} onClick={() => this.changeChannel(channel)}>
            {this.getNotificationCount(channel) && (
                <Label color='red'>{this.getNotificationCount(channel)}</Label>
            )}
            # {channel.channelName}
        </Menu.Item>
    ))



    render() {
        const { channels, modal, channelDetails, channelName } = this.state

        return (
            <React.Fragment>

                <Menu.Menu style={{ padding: '2em 0px' }}>
                    <Menu.Item>
                        <span>
                            <Icon name='exchange' />CHANNELS
             </span>
                        ({channels.length}) <Icon inverted name='add' onClick={this.openModal} />
                    </Menu.Item>
                    {this.displayChannels(channels)}
                </Menu.Menu>
                <Modal basic open={modal} onClose={this.closeModal}>
                    <Modal.Header>Add a Channel</Modal.Header>
                    <Modal.Content>
                        <Form >
                            <Form.Field>
                                <Input fluid label="Name of Channel" name='channelName' onChange={this.handleChange} value={channelName} />
                            </Form.Field>
                            <Form.Field>
                                <Input fluid label="About of Channel" name='channelDetails' onChange={this.handleChange} value={channelDetails} />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button inverted color='green' onClick={this.handleSubmit}>
                            <Icon name='checkmark' /> Add
                        </Button>
                        <Button inverted color='red' onClick={this.closeModal}>
                            <Icon name='remove' /> Cancel
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}

export default connect(null, { setCurrentChannel })(Channels)
