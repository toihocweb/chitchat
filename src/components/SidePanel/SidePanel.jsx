import React, { Component } from 'react'
import UserPanel from './UserPanel';
import { Menu } from '../../../node_modules/semantic-ui-react';
import Channels from './Channels';

class SidePanel extends Component {
  render() {
    return (
      <Menu size='large' inverted style={{ background: "#4c3c4c", fontSize: "1.2rem" ,marginLeft : '-200px'}} vertical fixed={`left`}>
        <UserPanel currentUser={this.props.currentUser} />
        <Channels currentUser = {this.props.currentUser}/>
      </Menu>

    )
  }
}

export default SidePanel
