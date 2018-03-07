import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// CSS
import styles from '../App/App.css';
import stylesSignup from './Signup.css';fdgdg


class SignupView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={stylesSignup.signupContainer}>

            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(SignupView));