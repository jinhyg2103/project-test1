import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import SignupBody from '../../Components/Authentication/SignupBody';
import Footer from './Footer';

// Styles
import stylesAuth from '../../Styles/Components/Authentication.css';


class SingupView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={stylesAuth.signupContainer}>
                <SignupBody />
                <Footer />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(SingupView));