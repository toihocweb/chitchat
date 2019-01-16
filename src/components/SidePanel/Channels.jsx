import React, { Component } from 'react'
import { Menu, Icon, Modal, Form, Input, Button } from '../../../node_modules/semantic-ui-react';
import { connect } from 'react-redux'
import firebase from '../../firebase'
import { setCurrentChannel } from '../../actions';
class Channels extends Component {
    state = {
        activeChannel : "", 
        user: this.props.currentUser,
        channels: [],
        channelName: '',
        channelDetails: '',
        modal: false,
        channelsRef: firebase.database().ref(`channels`),
        firstLoad  : true
    }
    setFirstChannel = () => {
          const firstChannel = this.state.channels[0] 
          if(this.state.firstLoad && this.state.channels.length > 0){
            this.props.setCurrentChannel(firstChannel)
      }
      this.setState({firstLoad  : false , activeChannel : firstChannel.id})
    }
    addListeners = () => {
        let loadedChannels = []
        this.state.channelsRef.on('child_added', snap => {
            loadedChannels.push(snap.val())
            this.setState({
                channels: loadedChannels
            },() => this.setFirstChannel())
        })
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
            this.setState({activeChannel : channel.id })
      }

    changeChannel = (channel) => {
        this.setActiveChannel(channel)
        this.props.setCurrentChannel(channel)
      }

    displayChannels = channels => channels.length > 0 && channels.map(channel => (
        <Menu.Item active={this.state.activeChannel === channel.id} key={channel.id} name={channel.channelName} onClick={() => this.changeChannel(channel)}>
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
