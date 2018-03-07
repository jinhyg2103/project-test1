import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import { Switch, Route } from 'react-router';

// Routes
import routes from './routes';

class App extends Component {
    render() {
        return (
            <Switch>
                {routes.map((route, index) => (
                    <Route key={index} {...route} />
                ))}
            </Switch>
        );
    }
}

export default App;
