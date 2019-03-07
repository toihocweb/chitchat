import React, { Component } from 'react'
import UserPanel from './UserPanel';
import { Menu } from '../../../node_modules/semantic-ui-react';
import Channels from './Channels';
import firebase from '../../firebase'
class SidePanel extends Component {
  state = {
    userRef : firebase.database().ref('users'),
    color: '',
    list: []
  }


  getColor = () => {
    this.state.userRef.child(this.props.currentUser.uid).on('value', snap => {
      this.setState({
        color: snap.val().color
      })
    })
  }
  componentDidMount(){
    this.getColor()
  }

  render() {
    const { currentUser } = this.props
    return (
      <Menu size='large' inverted style={{ background: this.state.color, fontSize: "1.2rem" ,marginLeft : '-200px'}} vertical fixed={`left`} >
        <UserPanel currentUser={currentUser} />
        {/* <Starred currentUser={currentUser}/> */}
        <Channels currentUser = {currentUser}/>
      </Menu>
    )
  }
}

export default SidePanel
