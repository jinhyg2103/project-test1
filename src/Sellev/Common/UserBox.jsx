import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Styles
import stylesUser from '../Styles/Common/UserBox.css';

class userBox extends React.Component {
    render() {
        return (
            <div className={stylesUser.userBox}>
                <img alt={''} src={this.props.imgUrl} />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(userBox));
