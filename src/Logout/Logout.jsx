import React, { Component } from 'react'
import { Button, Grid } from 'semantic-ui-react';
import './Logout.css'
import firebase from '../firebase'
class Logout extends Component {

    handleLogout = () => {
        firebase.auth().signOut().then(() => {
            console.log('loged out!')
        })
    }

    render() {
        return (
            <Grid textAlign="center">
                <Grid.Column className='logout'>
                    <Button onClick={this.handleLogout} content='Logout' />
                </Grid.Column>
            </Grid>

        )
    }
}

export default Logout
