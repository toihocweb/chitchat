import React, { Component } from 'react'
import { Button, Input, Icon, Modal } from 'semantic-ui-react'
import mime from 'mime-types'
class FileModal extends Component {
    state = {
        file: null,
        authorized: ['image/jpeg', 'image/png']
    }

    addFile = (e) => {
        const file = e.target.files[0]
        if (file) {
            this.setState({ file: file })
        }
    }

    sendFile = () => {
        const { file } = this.state
        const { uploadFile, closeModal } = this.props
        if (file !== null) {
            if (this.isAuthorized(file.name)) {
                const metadata = { contentType: mime.lookup(file.name) }
                uploadFile(file, metadata)
                closeModal()
                this.clearFile()
            }
        }
    }
    
    clearFile = () => {
        this.setState({ file: null })
    }

    isAuthorized = (filename) => this.state.authorized.includes(mime.lookup(filename))

    render() {
        const { modal, closeModal } = this.props
        return (
            <Modal open={modal} onClose={closeModal}>
                <Modal.Header>Select an Image File</Modal.Header>
                <Modal.Content>
                    <Input fluid type='file' name='file' label='File types: jpg, png' onChange={this.addFile} />
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' onClick={this.sendFile} icon inverted><Icon name='checkmark' />Send</Button>
                    <Button onClick={closeModal} color='red' icon inverted><Icon name='remove' />Cancel</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default FileModal
