import React, { Component } from 'react';
import './App.css';
import ColorPanel from '../components/ColorPanel/ColorPanel';
import Messages from '../components/Messages/Messages';
import { Grid } from '../../node_modules/semantic-ui-react';
import { connect } from 'react-redux'
import SidePanel from '../components/SidePanel/SidePanel';
import MetaPanel from '../components/MetaPanel/MetaPanel';

class App extends Component {

  render() {
    const {currentUser ,  currentChannel } = this.props
    return (
      <Grid columns="equal" className='app' style={{ background: '#eee' }} >
        <ColorPanel currentUser={currentUser}  />
        <SidePanel key = {currentUser && currentUser.uid} currentUser={currentUser} />

        <Grid.Column style={{marginLeft : '320px'}}>
          <Messages currentUser = {currentUser} key = {currentChannel && currentChannel.id} currentChannel={currentChannel}  />
        </Grid.Column>
        <Grid.Column width={4}>
          <MetaPanel key={currentChannel && currentChannel.id} currentChannel={currentChannel}/>
        </Grid.Column>
      </Grid>


    );
  }
}
const mapStateToProps = state => (
  {
    currentUser: state.user.currentUser,
    currentChannel : state.channel.currentChannel
  }
)
export default connect(mapStateToProps)(App);
