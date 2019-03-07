import React, { Component } from 'react'
import { Segment, Accordion, Header, Icon } from 'semantic-ui-react'
class MetaPanel extends Component {
  state = {
    channel: this.props.currentChannel,
    activeIndex: 0
  }
  setActiveIndex = (event, titleProps) => {
    const { activeIndex } = this.state
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex })
  }



  render() {
    const { activeIndex,channel } = this.state
    // console.log(channel)
    return (
      <Segment>
        {channel !== null && (
          <React.Fragment>
            <Header as='h3' attached='top'>About #{channel.channelName}</Header>
           <Accordion styled attached='true'>
             <Accordion.Title active={activeIndex === 0} index={0} onClick={this.setActiveIndex}>
               <Icon name='dropdown' />
               <Icon name='info' />
               Channel Detail
             </Accordion.Title>
             <Accordion.Content active={activeIndex === 0}>
               {channel.channelDetails}
             </Accordion.Content>
   
             <Accordion.Title active={activeIndex === 1} index={1} onClick={this.setActiveIndex}>
               <Icon name='dropdown' />
               <Icon name='user circle' />
               Top Posters
             </Accordion.Title>
             <Accordion.Content active={activeIndex === 1}>
               Top Posters
              </Accordion.Content>
             <Accordion.Title active={activeIndex === 2} index={2} onClick={this.setActiveIndex}>
               <Icon name='dropdown' />
               <Icon name='pencil alternate' />
               Created By
             </Accordion.Title>
             <Accordion.Content active={activeIndex === 2}>
               {channel.createBy.name}
             </Accordion.Content>
           </Accordion>
          </React.Fragment>
         
        )}
       
      </Segment>
    )
  }
}

export default MetaPanel
