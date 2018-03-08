import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Styles
import styles from './BubbleBox.css';


class BubbleBox extends React.Component {
    render() {
        return (
            <div>
                버블박스
            </div>
        );
    }
}
export default connect()(withRouter(BubbleBox));
