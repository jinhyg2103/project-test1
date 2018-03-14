import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import VerifyBody from '../../Components/Authentication/FindPasswordVerifyBody';
import ChangeBody from '../../Components/Authentication/FindPasswordChangeBody';
import SignupFooter from './SignupFooter';

// Styles
import stylesAuth from '../../Styles/Components/Authentication.css';


class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            verified: true, // 이걸로 비밀번호 변경 전에 인증이 됐는지 여부를 나타낼 생각입니다.
        };
        this.verifyUser = this.verifyUser.bind(this);
    }
    verifyUser(verified) {
        console.log(verified);
        this.setState({
            verified: verified,
        });
    }
    render() {
        return (
            <div className={stylesAuth.findPasswordContainer}>
                { this.state.verified ? <ChangeBody /> : <VerifyBody onVerified={(verified) => this.verifyUser(verified)} /> }
                <SignupFooter />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(LoginView));
