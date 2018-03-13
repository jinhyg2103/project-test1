import React from 'react';
import {
    Link,
    Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import LoginContainer from "../../Components/Authentication/Login";
import SignupContainer from "../../Components/Authentication/Signup";
import FindPasswordContainer from "../../Components/Authentication/FindPassword";

// Styles
import stylesAuth from '../../Styles/Containers/Authentication.css';


class LoginView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={stylesAuth.authContainer}>
                <Route path={'/auth/login'} exact={true} strict={false} component={LoginContainer} />
                <Route path={'/auth/signup'} exact={true} strict={false} component={SignupContainer} />
                <Route path={'/auth/findpassword'} exact={true} strict={false} component={FindPasswordContainer} />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(LoginView));