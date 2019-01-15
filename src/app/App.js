import React, { Component } from 'react';
import './App.css';
import ColorPanel from '../components/ColorPanel/ColorPanel';
import Messages from '../components/Messages/Messages';
import { Grid } from '../../node_modules/semantic-ui-react';
import SidePanel from '../components/SidePanel/SidePanel';
import MetaPanel from '../components/MetaPanel/MetaPanel';

class App extends Component {
  render() {
    return (
      <Grid columns="equal" className='app' style={{ background: '#eee' }} >
     
        <SidePanel />
        <ColorPanel />
        <Grid.Column style={{marginLeft : 320}}>
          <Messages />
        </Grid.Column>
        <Grid.Column width={4}>
          <MetaPanel />
        </Grid.Column>
      </Grid>


    );
  }
}

export default App;
