import React, { Component } from 'react'
import { Segment, Input, Button } from '../../../node_modules/semantic-ui-react';
import firebase from '../../firebase'
import uuidv4 from 'uuidv4'
import FileModal from './FileModal'
import ProgressBar from './ProgressBar';
class MessageForm extends Component {
  state = {
    message: '',
    isLoading: false,
    errors: [],
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    modal: false,
    uploadState: '',
    uploadTask: null,
    storageRef: firebase.storage().ref(),
    percentuploaded: 0,
  }

  openModal = () => {
    this.setState({ modal: true })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  createMessage = (fileUrl = null) => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.state.user.uid,
        name: this.state.user.displayName,
        avatar: this.state.user.photoURL,
      }
    }
    if (fileUrl !== null) {
      message['image'] = fileUrl
    } else {
      message['content'] = this.state.message
    }
    return message
  }

  handleSubmit = () => {
    const { messageRef } = this.props
    const { message, errors, channel } = this.state
    if (message) {
      // send message
      this.setState({ isLoading: true })
      messageRef.child(channel.id).push().set(this.createMessage()).then(() => {
        this.setState({ isLoading: false, message: '', errors: [] })
      }).catch(err => {
        this.setState({
          isLoading: false,
          errors: this.state.errors.concat(err.message)
        })
      })
    } else {

      this.setState({
        errors: errors.concat({ message: "Add a message" })
      })
    }
  }

  openModal = () => {
    this.setState({ modal: true })
  }
  closeModal = () => {
    this.setState({ modal: false })
  }

  uploadFile = (file, metadata) => {
    const pathToUpdate = this.state.channel.id
    const ref = this.props.messageRef
    const filePath = `chat/public/${uuidv4()}.jpg`
    this.setState({
      uploadState: 'uploading',
      uploadTask: this.state.storageRef.child(filePath).put(file, metadata)
    }, () => {
      this.state.uploadTask.on('state_changed', snap => {
        const percentuploaded = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
        this.setState({ percentuploaded })
      }, err => {
        console.error(err)
        this.setState({
          errors: this.state.errors.concat(err),
          uploadState: 'error',
          uploadTask: null
        })
      }, () => {
        this.state.uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
          this.sendFileMessage(downloadUrl, ref, pathToUpdate)
        }).catch(err => {
          console.error(err)
          this.setState({
            errors: this.state.errors.concat(err),
            uploadState: 'error',
            uploadTask: null
          })
        })
      })
    })
  }

  sendFileMessage = (fileUrl, ref, pathToUpdate) => {
    ref.child(pathToUpdate).push().set(this.createMessage(fileUrl)).then(() => {
      this.setState({
        uploadState: 'done'
      })
    }).catch(err => {
      console.error(err)
      this.setState({ errors: this.state.errors.concat(err) })
    })
  }

  render() {
    const { errors, message, modal,uploadState , percentuploaded } = this.state
    return (
      <Segment className='message__form' size='small'>
        <Input value={message} className={errors.some(error => error.message.includes('message')) ? "error" : ""} fluid name='message' onChange={this.handleChange} style={{ marginBottom: '0.7em' }} label={<Button icon={'add'} />} labelPosition='left' placeholder='Write Your Message' />
        <Button.Group icon widths='2'>
          <Button color='orange' content='Add Reply' labelPosition='left' icon='edit' onClick={this.handleSubmit} />
          <Button color='teal' content='Upload Media' labelPosition='right' icon='cloud upload' onClick={this.openModal} />
        </Button.Group>
          <FileModal modal={modal} closeModal={this.closeModal} uploadFile={this.uploadFile} disabled= {uploadState === 'uploading'  }/>
          <ProgressBar uploadState={uploadState} percentuploaded={percentuploaded} />
      </Segment>
    )
  }
}

export default MessageForm
