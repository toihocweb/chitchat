import React, { Component } from 'react'
import { Sidebar, Menu, Divider, Button, Modal, Icon, Label } from '../../../node_modules/semantic-ui-react';
import { TwitterPicker } from 'react-color'
import firebase from '../../firebase'
class ColorPanel extends Component {

  state = {
    modal: false,
    color: '',
    userRef: firebase.database().ref('users'),
    user: this.props.currentUser 
  }

  openModal = () => this.setState({ modal: true })
  closeModal = () => this.setState({ modal: false })


  handleChangeColor = (color) => {
    this.setState({
      color: color.hex
    })
  }
  handleSaveColor = () => {
    if (this.state.color) {
      this.saveColors(this.state.color)
     this.closeModal()
    }
  }

  saveColors = () => {
    this.state.userRef.child(this.state.user.uid).update({
      color: this.state.color
    })
  }

  render() {
    const { modal, color } = this.state

    return (
      <Sidebar as={Menu} icon='labeled' inverted vertical with="very thin" visible>
        <Divider />
        <Button icon='add' size='small' color='blue' onClick={this.openModal} />
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Choose App Colors</Modal.Header>
          <Modal.Content>
            <TwitterPicker color={color} onChange={this.handleChangeColor} />
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' inverted onClick={this.handleSaveColor}>
              <Icon name='checkmark' /> Save Color
            </Button>
            <Button color='red' inverted onClick={this.closeModal}>
              <Icon name='remove' /> Close
            </Button>
          </Modal.Actions>
        </Modal>
      </Sidebar>
    )
  }
}

export default ColorPanel
