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
    return (
      <Grid columns="equal" className='app' style={{ background: '#eee' }} >
        <ColorPanel />
        <SidePanel currentUser={this.props.currentUser} />

        <Grid.Column style={{marginLeft : '320px'}}>
          <Messages />
        </Grid.Column>
        <Grid.Column width={4}>
          <MetaPanel />
        </Grid.Column>
      </Grid>


    );
  }
}
const mapStateToProps = state => (
  {
    currentUser: state.user.currentUser
  }
)
export default connect(mapStateToProps)(App);
