import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import LoginBtn from './LoginBtn';

// Styles
import stylesLogin from './Login.css';

class LoginBody extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={stylesLogin.loginBody}>
                <div>셀레브 로고</div>
                <div>
                    <LoginBtn />
                    <LoginBtn />
                    <LoginBtn />
                </div>
                <div>OR</div>
                <
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(LoginBody));

