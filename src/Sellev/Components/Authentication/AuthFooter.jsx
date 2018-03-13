import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Styles
import stylesAuth from '../../Styles/Components/Authentication.css';

class AuthFooter extends React.Component {
    render() {
        return (
            <div className={stylesAuth.loginFooter}>
                <Link to={'/password'}>비밀번호찾기</Link>
                <div className={stylesAuth.logoBox}>
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
})(withRouter(AuthFooter));

