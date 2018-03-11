import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

//Component
import SignupBody from '../../Components/Signup/SignupBody';
import SignupFooter from '../../Components/Signup/SignupFooter';

//CSS
import StyleSignup from '../../Styles/Components/Signup.css';

class SignupView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={StyleSignup.signupContainer}>
                <SignupBody />
                <SignupFooter />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(SignupView));
