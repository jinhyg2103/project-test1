import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Styles
import stylesLogin from '../../Styles/Components/Login.css';

class LoginFooter extends React.Component {
    render() {
        return (
            <div className={stylesLogin.loginFooter}>
                <Link to={'/password'}>비밀번호찾기</Link>
                <div className={stylesLogin.logoBox}>
                    <div />
                    <span>Copyright All Right Reserved</span>
                </div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(LoginFooter));

