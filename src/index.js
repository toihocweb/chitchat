import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import Register from './auth/Register';
import Login from './auth/Login';
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import { setUser, clearUser } from './actions'
import firebase from 'firebase'
import rootReducer from './reducers';
import Spinner from './Spinner'
const store = createStore(rootReducer, composeWithDevTools())

class Root extends React.Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.setUser(user)
                this.props.history.push('/')
            } else {
                this.props.clearUser()
                this.props.history.push('/login')
            }
        })
    }


    render() {
        return this.props.isLoading ? <Spinner /> : (
            <Switch>
                <Route path='/' exact component={App} />
                <Route path='/register' component={Register} />
                <Route path='/login' component={Login} />
            </Switch>
        );
    }
}
const mapStateFromProps = state => ({
    isLoading: state.user.isLoading
})
const RootwithAuth = withRouter(connect(mapStateFromProps, { setUser, clearUser })(Root))

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <RootwithAuth />
        </Router>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
