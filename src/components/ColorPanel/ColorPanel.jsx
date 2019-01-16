import React, { Component } from 'react'
import { Sidebar, Menu, Divider, Button } from '../../../node_modules/semantic-ui-react';

 class ColorPanel extends Component {
  render() {
    return (
     <Sidebar as={Menu} icon='labeled' inverted vertical with="very thin" visible>
        <Divider />
        <Button icon = 'add' size='small' color='blue'/>
     </Sidebar>
    )
  }
}

export default ColorPanel
