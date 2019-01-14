import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Register from './auth/Register';
import Login from './auth/Login';

const Root = () => (
    <Router>
        <Switch>
            <Route path='/' exact component={App} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
        </Switch>
    </Router>

)



ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
