import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import LoginBody from '../../Components/Authentication/LoginBody';
import Footer from './Footer';

// Styles
import stylesAuth from '../../Styles/Components/Authentication.css';


class LoginView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={stylesAuth.loginContainer}>
                <LoginBody />
                <Footer />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(LoginView));