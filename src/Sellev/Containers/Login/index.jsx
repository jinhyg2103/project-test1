import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import LoginBody from '../../Components/Login/LoginBody';
import LoginFooter from '../../Components/Login/LoginFooter';

// Styles
import stylesLogin from '../../Styles/Components/Login.css';


class LoginView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={stylesLogin.loginContainer}>
                <LoginBody />
                <LoginFooter />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(LoginView));