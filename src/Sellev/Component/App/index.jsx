import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

// Components
import HeaderComponent from './Header';
import HomeComponent from '../Home/index';

// Actions
import * as ActionAuth from '../../Data/Authentification/actions';

// Routes
import routes from '../../routes';

// Styles
import styles from './App.css';

class RootView extends React.Component {
    render() {
        return (
            <div className={styles.AppContainer}>
                <HeaderComponent />
                <Route path={'/'} exact={true} strict={true} component={HomeComponent} />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(RootView));
