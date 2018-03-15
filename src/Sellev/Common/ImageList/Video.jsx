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
class Video extends React.Component {
    componentWillMount() {
        console.log(this.props.listItem);
        console.log(this.props.type);
    }
    render() {
        return (
            <div className={styles.videoList}>
                <div className={styles.listTitle}>{this.props.listItem.title}</div>
                <div className={styles.listBody}>
                    <div>{this.props.listItem.name}</div>
                    <span> | </span>
                    <div className={styles.likeImg} />
                    <div>{this.props.listItem.like}</div>
                </div>
            </div>
        );
    }
}
export default connect()(withRouter(Video));
