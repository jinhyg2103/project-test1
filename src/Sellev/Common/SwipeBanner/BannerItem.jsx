import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Styles
import styles from '../../Styles/Common/SwipeBanner.css';

/*
* this.props.bgImage
* this.props.profile
* this.props.title
* this.props.artist
* this.props.width
* this.props.height
*/

class BannerItem extends React.Component {
    render() {
        return (
            <div className={styles.listBox} key={this.props.key}>
                <div className={styles.bgImage} style={{ backgroundImage: 'url("' + this.props.bgImage +'")'}} />
                <div className={styles.titleBox}>
                    <div>{this.props.artist}</div>
                    <div>
                        {this.props.title}
                    </div>
                </div>
            </div>
        );
    }
}
export default connect()(withRouter(BannerItem));
