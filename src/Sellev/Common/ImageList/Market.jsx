import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Styles
import styles from '../../Styles/Common/ImageList.css';

/*
* this.props.listItem
*/
class Market extends React.Component {
    render() {
        return (
            <div>
                <div>{this.props.listItem.name}</div>
                <div>{this.props.listItem.title}</div>
                <div>
                    <div>\ 25900</div>
                    <div><span>7개</span> 남음</div>
                </div>
            </div>
        );
    }
}
export default connect()(withRouter(Market));
