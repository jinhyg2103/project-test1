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
* this.props.title
* this.props.artist
* this.props.width
* this.props.height
*/

class BannerItem extends React.Component {
    render() {
        return (
            <div>
                <li className={styles.listBox} key={this.props.key}>
                    <img src={this.props.bgImage} alt=" " />
                    <div className={styles.titleBox}>
                        <div>{this.props.artist}</div>
                        <div>
                            {this.props.title}
                        </div>
                    </div>
                </li>
            </div>
        );
    }
}
export default connect()(withRouter(BannerItem));
