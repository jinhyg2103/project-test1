import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Styles
import stylesAuth from '../../Styles/Components/Authentication.css';

// Utils
import * as ParseUrlParameter from '../../Lib/Utils/parseUrlParameter';

class AuthFooter extends React.Component {
    componentWillMount() {
        this.setState({
            urlParams: ParseUrlParameter.parse(this.props.location.search),
        })
    }
    render() {
        return (
            <div className={stylesAuth.loginFooter}>
                <Link to={'/auth/findpassword'}>비밀번호찾기</Link>
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

