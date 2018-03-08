import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Styles
import styles from './SwipeBanner.css';


class SwipeBanner extends React.Component {
    render() {
        return (
            <div>
            </div>
        );
    }
}
export default connect()(withRouter(SwipeBanner));
