import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Styles
import styles from './SwipeBanner.css';

/*
* this.props.bgImage
* this.props.profile
* this.props.text
* this.props.name
* this.props.width
* this.props.height
*/

class SwipeBanner extends React.Component {
    render() {
        return (
            <div>
            </div>
        );
    }
}
export default connect()(withRouter(SwipeBanner));
