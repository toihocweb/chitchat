import React, { Component } from 'react'
import { Grid, Header, Icon, Form, Segment, Button, Message } from '../../node_modules/semantic-ui-react';
import { Link } from 'react-router-dom'
import firebase from '../firebase'
import md5 from 'md5'
class Register extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        repassword: '',
        errors: [],
        isSuccess : false,
        usersRefs : firebase.database().ref("users"),
        isLoading : false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSunmit = (e) => {
        e.preventDefault()
       
        if (this.isFormValid()) {
            this.setState({isLoading : true})
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(createdUser => {
                createdUser.user.updateProfile({
                    displayName : this.state.username,
                    photoURL : `http://www.gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                }).then(() => {this.saveUser(createdUser)}).then(() => console.log(createdUser))
                this.setState({
                    username: '',
                    email: '',
                    password: '',
                    repassword: '',
                    errors: [],
                    isSuccess : true,

                })
            }).catch(err => {
                this.setState({
                    errors : this.state.errors.concat(err),
                    isLoading : false
                })
            })
        }
    }

     saveUser = (createdUser) => {
            return this.state.usersRefs.child(createdUser.user.uid).set({
                name : createdUser.user.displayName,
                avatar : createdUser.user.photoURL
            })
      }

    isFormValid = () => {
        let errors  = []
        let err 

        if (this.isFormEmpty(this.state)) {
            err = { message : 'Fill in all fields!'}
            this.setState({
                errors : errors.concat(err)
            })
            return false
        } else if (this.isPasswordInvalid(this.state.password, this.state.repassword)) {
            err = { message : 'PAssword dont match!'}
            this.setState({
                errors : errors.concat(err)
            })
            return false
        } else {
            this.setState({
                errors : []
            })
            return true
        }
    }

    isPasswordInvalid = (password, repassword) => {
        if(password !== repassword){
            return true
        }
      }

    isFormEmpty = ({ username, email, password, repassword }) => {
        return !username.length || !email.length || !password.length || !repassword.length
    }

    render() {
        const { username, email, password, repassword } = this.state
        return (
            <Grid verticalAlign='middle' textAlign='center' className='register' >
                <Grid.Column style={{ maxWidth: 600 }}>
                    <Header icon color='orange' as='h2'>
                        <Icon name='graduation cap' size='tiny' />Register With DevChat
                    </Header>
                    {this.state.isSuccess && (
                        <Message   color='green' content="Successsfully!"/>
                    )}
                    <Segment>
                        <Form onSubmit={this.handleSunmit}>
                            <Form.Input iconPosition='left' placeholder="Usernane" icon='user' name='username' onChange={this.handleChange} value={username} type='text' />
                            <Form.Input iconPosition='left' placeholder="Email" icon='mail' name='email' onChange={this.handleChange} value={email} type='email' />
                            <Form.Input iconPosition='left' placeholder="Password" icon='lock' name='password' onChange={this.handleChange} value={password} type='password' />
                            <Form.Input iconPosition='left' placeholder="Re-Password" icon='undo' name='repassword' onChange={this.handleChange} value={repassword} type='password' />
                            {this.state.errors.length > 0 && this.state.errors.map((err,index) => (<Message  key={index} color='red' content={err.message}/>))}
                            <Button fluid color='orange' loading={this.state.isLoading} disabled={this.state.isLoading}> Submit</Button>
                        </Form>
                        <Message warning>
                            <Icon name='help' />
                            Already signed up?<Link to='login'>Login here</Link> instead.
                         </Message>
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Register
