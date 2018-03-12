import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import LoginBtn from './LoginBtn';

// Styles
import stylesLogin from '../../Styles/Components/Login.css';

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
                <div>
                    <div className={stylesLogin.formGroup}>
                        <div className={stylesLogin.formRow}>
                            <div className={stylesLogin.formTitle}>

                            </div>
                            <input />
                        </div>
                        <div className={stylesLogin.formRow}>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(LoginBody));

