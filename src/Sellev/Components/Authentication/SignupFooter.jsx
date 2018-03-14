import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components


// Styles
import stylesSignup from '../../Styles/Components/Authentication.css';

class SignupFooter extends React.Component {
    render() {
        return (
            <div className={stylesSignup.signupFooter}>
                <Link to={'/login'}>로그인</Link>
                <span> | </span>
                <Link to={'/password'}>비밀번호찾기</Link>
                <div className={stylesSignup.logoBox}>
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
})(withRouter(SignupFooter));
